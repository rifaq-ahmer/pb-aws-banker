export const config = {
	API: {
		endpoints: [
			{
				name: "LoanApprovalApi",

				endpoint:
					"https://xot7r87w4b.execute-api.us-east-2.amazonaws.com/ExternalAPI",
			},
		],
	},

	Auth: {
		region: "us-east-2",

		identityPoolRegion: "us-east-2",

		userPoolId: "us-east-2_azGlGHOz4",

		userPoolWebClientId: "61rgj9l5hkldp4350t8hmbf2l3",

		mandatorySignIn: true,

		authenticationFlowType: "USER_SRP_AUTH",

		clientMetadata: { myCustomKey: "myCustomValue" },

		oauth: {
			domain: "banker.auth.us-east-2.amazoncognito.com",

			scope: ["email", "openid"],

			redirectSignIn: "https://master.d1q0czh86hkdgz.amplifyapp.com/",

			logoutUri: "https://master.d1q0czh86hkdgz.amplifyapp.com/",

			redirectUri: "https://master.d1q0czh86hkdgz.amplifyapp.com/",

			redirectSignOut: "https://master.d1q0czh86hkdgz.amplifyapp.com/",

			responseType: "token",
		},
	},
};

const awsmobile = {
	aws_project_region: "us-east-2",
	aws_cognito_identity_pool_id:
		"us-east-2:f06d6b8d-8490-40d9-922d-0417a9f3eb7c",
	aws_cognito_region: "us-east-2",
	aws_user_pools_id: "ap-south-1_hEjaz8gqs",
	aws_user_pools_web_client_id: "5e1rauvsded6cepsrl3f56tmfr",
	oauth: {},
	aws_cognito_login_mechanisms: ["EMAIL"],
	aws_cognito_signup_attributes: ["EMAIL"],
	aws_cognito_mfa_configuration: "OFF",
	aws_cognito_mfa_types: ["SMS"],
	aws_cognito_password_protection_settings: {
		passwordPolicyMinLength: 8,
		passwordPolicyCharacters: [],
	},
};

export default awsmobile;
