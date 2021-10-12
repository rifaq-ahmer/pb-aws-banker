import React, { useState, useEffect } from "react";
import DropdownComponent from "../Dropdown/dropdown";
import axios from "axios";
import { API_ENDPOINT } from "../../App";
import { APP_CLIENT_ID } from "../../App";
import "./banker.css";

function Banker() {
	const [status, setStatus] = useState([]);
	const [loanData, setLoanData] = useState([]);
	let currentStatus = "";

	const userName = localStorage.getItem(
		`CognitoIdentityServiceProvider.${APP_CLIENT_ID}.LastAuthUser`
	);

	const accessToken = localStorage.getItem(
		`CognitoIdentityServiceProvider.${APP_CLIENT_ID}.${userName}.accessToken`
	);

	axios.defaults.headers.common["Authorization"] = accessToken;
	// "eyJraWQiOiJrSURWK2lTS0RvMU5mMGJHbjhSUlpiMnNIdE1jYVJmS2JZMDB6eWVXM29rPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5ZWIzYzZlNy1lMjM5LTRlZTQtYWUxOC1mMjNiNmU0NzhkN2UiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNjM0MDExMjI5LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xX2hFamF6OGdxcyIsImV4cCI6MTYzNDA5NzYyOSwiaWF0IjoxNjM0MDExMjI5LCJ2ZXJzaW9uIjoyLCJqdGkiOiJlYTI4MDY4Zi01ZGIzLTRkNWMtYTFjMi00MzMzN2UwNzk4MmUiLCJjbGllbnRfaWQiOiIzNHNvNGplcjQ0dTJwMzlmZmpxYmxuN2N2dCIsInVzZXJuYW1lIjoicHJhdmluIn0.s7ldVZtrKVGsLV2YEiLIvoBZhD4Afm7-6n5hOQ5SqelR9CJzjDhVXHrMfRJcfgysBThnhqGLdQO_zZEQ23ZqWIuwDItvL8TCc6hYJvb7Y2XlN-GBuNn7uwP021U5_mK6spPjGd6dDBk-avi2a4WUNKyNRPrQBt6aGmaANqxXbJxs-DnOgI4nxPA9LKpOdaNiHaccq9kx73nV0FJt0WYCSrGROWP-z_vloQO-1uTaPDefJzjXH8raRzAObphYLzMb8o3vqOhXyfe8ZM3BO2ZTypTXehnfSm-zTeNpr2qOuSjaesU1I_R57aW1U10J2sKSwO3gl1_wkbJXRyfwTwpwrw";

	useEffect(() => {
		axios
			.get(`${API_ENDPOINT}/getloanstatustypebanker/loanstatus`)
			.then((res) => setStatus(res.data))
			.catch((error) => console.log(error));

		axios
			.get(`${API_ENDPOINT}/loanapproval/banker`)

			.then((res) => {
				if (typeof res.data !== "string") {
					setLoanData(res.data);
				}
			})
			.catch((error) => console.log(error));
	}, []);
	const handleChange = (event) => {
		currentStatus = event.target.value;
	};

	const handleSubmit = async (event, id) => {
		event.preventDefault();
		console.log(id);
		await axios

			.put(
				`${API_ENDPOINT}/loanapproval/banker/${id}`,

				{
					LoanApplication_Status: currentStatus,

					LoanApplication_BankerComment: " Approved For Credit",
				}
			)

			.then((res) => {
				alert(`${res.data} of Loan Application id: ${id}`);
			})

			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<div className="container">
				<h3 className="grid-heading">All Loan Details</h3>
				<div className="data-grid-header">
					<div>Name</div>
					<div>Buisness</div>
					<div>Loan Amount</div>
					<div>Status</div>
				</div>
				{loanData.length > 0 ? (
					loanData.map((loan) => (
						<>
							<div key={loan.Applicant_ID} className="data-grid">
								<div>
									{loan.Applicant_fname} {loan.Applicant_mname}{" "}
									{loan.Applicant_lname}
								</div>
								<div>{loan.Business_Name}</div>
								<div>{loan.LoanApplication_Amount}</div>
								<div>
									<DropdownComponent
										options={status}
										onSubmit={(event) =>
											handleSubmit(event, loan.LoanApplication_ID)
										}
										onChange={handleChange}
									/>
								</div>
							</div>
						</>
					))
				) : (
					<h1>No Load Data Found </h1>
				)}
			</div>
		</>
	);
}

export default Banker;
