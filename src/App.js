import Banker from "./components/Banker/banker";
import Amplify from "aws-amplify";
import awsconfig from "./aws-config";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";

Amplify.configure(awsconfig);

function App() {
	return (
		<>
			<div className="container">
				<div className="page-heading">
					<AmplifySignOut />
					<h1>Banker Application</h1>
				</div>
			</div>
			<Banker />
		</>
	);
}

export default withAuthenticator(App);
