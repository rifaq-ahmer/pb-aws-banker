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
