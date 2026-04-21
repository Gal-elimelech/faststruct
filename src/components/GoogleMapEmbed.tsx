import { HTMLAttributes } from "react";

interface GoogleMapEmbedProps extends HTMLAttributes<HTMLIFrameElement> {
    address: string;
    city: string;
}


const GoogleMapEmbed = async ({
    address,
    city,
    ...props
}: GoogleMapEmbedProps) => {
    return (
        <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(
                `${address}, ${city}`
            )}&output=embed`}
            width='100%'
            height='100%'
            style={{ border: 0 }}
            allowFullScreen
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            className='h-full w-full'
            title='Fast Struct Location'
        />
    )
}

export default GoogleMapEmbed