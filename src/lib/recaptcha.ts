import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';
import { env } from './env';
import { google } from '@google-cloud/recaptcha-enterprise/build/protos/protos';

const client = new RecaptchaEnterpriseServiceClient({
  apiKey: env.googleCloudApiKey,
});

export interface RecaptchaAssessmentResult {
  score: number;
  reasons: google.cloud.recaptchaenterprise.v1.RiskAnalysis.ClassificationReason[];
  action: string;
}

export async function createAssessment({
  siteKey,
  token,
  userIpAddress,
  userAgent,
  recaptchaAction = '',
}: {
  siteKey: string;
  token: string;
  userIpAddress: string;
  userAgent: string;
  recaptchaAction?: string;
}): Promise<RecaptchaAssessmentResult | null> {
  const projectPath = client.projectPath(env.googleCloudProjectId);

  const request: google.cloud.recaptchaenterprise.v1.ICreateAssessmentRequest =
    {
      assessment: {
        event: {
          token,
          siteKey,
          userIpAddress,
          userAgent,
          expectedAction: recaptchaAction,
        },
      },
      parent: projectPath,
    };

  const [response] = await client.createAssessment(request);

  if (!response.tokenProperties) {
    console.log('The CreateAssessment call failed.', response);
    return null;
  }

  if (!response.tokenProperties.valid) {
    console.log(
      'The CreateAssessment call failed because the token was: ' +
        response.tokenProperties.invalidReason
    );

    return null;
  }

  const tokenAction = response.tokenProperties.action ?? '';
  if (recaptchaAction && tokenAction && tokenAction !== recaptchaAction) {
    console.log(
      'The action attribute in your reCAPTCHA tag ' +
        'does not match the action you are expecting to score'
    );
    return null;
  }

  if (!response.riskAnalysis) {
    console.log('The risk analysis is null.', response);
    return null;
  }

  const score = response.riskAnalysis.score ?? 0;
  const reasons = response.riskAnalysis.reasons ?? [];
  console.log('The reCAPTCHA score is: ' + score);
  reasons.forEach((reason) => {
    console.log(reason);
  });

  return {
    score,
    reasons,
    action: tokenAction,
  };
}
