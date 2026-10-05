create table if not exists public.website_contact_limits (
  bucket_key text primary key,
  request_count integer not null,
  reset_at timestamptz not null
);
create index if not exists website_contact_limits_reset_idx on public.website_contact_limits(reset_at);
alter table public.website_contact_limits enable row level security;
revoke all on public.website_contact_limits from public, anon, authenticated;
grant select, insert, update, delete on public.website_contact_limits to service_role;
create or replace function public.consume_website_contact_limit(p_key text, p_limit integer, p_window_seconds integer)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare v_count integer; v_reset timestamptz; v_now timestamptz := clock_timestamp();
begin
  if length(p_key) > 100 or p_limit < 1 or p_limit > 100 or p_window_seconds < 1 or p_window_seconds > 86400 then
    raise exception 'Invalid limit parameters';
  end if;
  delete from public.website_contact_limits where reset_at < v_now - interval '1 day';
  insert into public.website_contact_limits as limits(bucket_key,request_count,reset_at)
  values(p_key,1,v_now + make_interval(secs => p_window_seconds))
  on conflict(bucket_key) do update set
    request_count = case when limits.reset_at <= v_now then 1 else least(limits.request_count + 1,p_limit + 1) end,
    reset_at = case when limits.reset_at <= v_now then v_now + make_interval(secs => p_window_seconds) else limits.reset_at end
  returning request_count,reset_at into v_count,v_reset;
  return jsonb_build_object('success',v_count <= p_limit,'remaining',greatest(p_limit-v_count,0),'retryAfterSeconds',greatest(1,ceil(extract(epoch from v_reset-v_now))::integer));
end;
$$;
revoke all on function public.consume_website_contact_limit(text,integer,integer) from public,anon,authenticated;
grant execute on function public.consume_website_contact_limit(text,integer,integer) to service_role;
