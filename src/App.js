import Banker from "./components/Banker/banker";
import Amplify from "aws-amplify";
import { config } from "./aws-config";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";

Amplify.configure(config);

const onSignOut = () => {
	localStorage.clear();
};

function App() {
	return (
		<>
			<div className="container">
				<div className="page-heading">
					<AmplifySignOut onClick={onSignOut} />
					<h1>Loan Approval</h1>
				</div>
			</div>
			<Banker />
		</>
	);
}

export default withAuthenticator(App);
