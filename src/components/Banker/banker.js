import React, { useState, useEffect } from "react";
import DropdownComponent from "../Dropdown/dropdown";
import Amplify, { Auth, API } from "aws-amplify";
import "./banker.css";

function Banker() {
	const [status, setStatus] = useState([]);
	const [loanData, setLoanData] = useState([]);
	let currentStatus = "";

	useEffect(() => {
		Auth.currentAuthenticatedUser().then((response) => {
			const token = response.signInUserSession.accessToken.jwtToken;
			localStorage.setItem("accessToken", token);
			const request = {
				headers: {
					Authorization: token,
				},
			};

			API.get("LoanApprovalApi", "/loanapproval/banker", request)
				.then((json) => {
					console.log(json);
					if (typeof json !== "string") {
						setLoanData(json);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		});

		Auth.currentAuthenticatedUser().then((response) => {
			const token = localStorage.getItem("accessToken");
			const request = {
				headers: {
					Authorization: token,
				},
			};

			API.get("LoanApprovalApi", "/getloanstatustypebanker/loanstatus", request)
				.then((json) => {
					setStatus(json);
				})
				.catch((error) => {
					console.log(error);
				});
		});
	}, []);
	const handleChange = (event) => {
		currentStatus = event.target.value;
	};

	const handleSubmit = async (event, id) => {
		event.preventDefault();
		Auth.currentAuthenticatedUser().then((response) => {
			const token = localStorage.getItem("accessToken");
			const request = {
				headers: {
					Authorization: token,
				},
				body: {
					LoanApplication_Status: currentStatus,

					LoanApplication_BankerComment: " Approved For Credit",
				},
			};
			Amplify.API.put("LoanApprovalApi", `/loanapproval/banker/${id}`, request)
				.then((json) => {
					alert(json);
				})
				.catch((error) => {
					console.log(error);
				});
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
								{loan.LoanApplication_Status !== 8 ? (
									<div>
										<DropdownComponent
											options={status}
											onSubmit={(event) =>
												handleSubmit(event, loan.CreditorAssigned_ID)
											}
											onChange={handleChange}
										/>
									</div>
								) : (
									<div>
										<p>Loan Request Closed by External Service </p>
									</div>
								)}
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
