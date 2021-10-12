import Banker from "./components/Banker/banker";
import Amplify from "aws-amplify";
import { config } from "./aws-exports";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";

Amplify.configure(config);

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
