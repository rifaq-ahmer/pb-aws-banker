import React, { useState, useEffect } from "react";
import DropdownComponent from "../Dropdown/dropdown";
import Amplify, { Auth, API } from "aws-amplify";
import "./banker.css";

function Banker() {
	const [status, setStatus] = useState([]);
	const [loanData, setLoanData] = useState([]);
	const [dropDownValue, setDropDownValue] = useState({});

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
	const handleChange = (event, name) => {
		const data = { ...dropDownValue };
		data[name] = event.target.value;
		setDropDownValue(data);
	};

	const handleSubmit = async (event, id, name) => {
		event.preventDefault();
		Auth.currentAuthenticatedUser().then((response) => {
			const token = localStorage.getItem("accessToken");
			const request = {
				headers: {
					Authorization: token,
				},
				body: {
					LoanApplication_Status: dropDownValue[name],

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
					loanData.map((loan, index) => (
						<>
							<div key={loan.Applicant_ID} className="data-grid">
								<div>
									{loan.Applicant_fname} {loan.Applicant_mname}{" "}
									{loan.Applicant_lname}
								</div>
								<div>{loan.Business_Name}</div>
								<div>{loan.LoanApplication_Amount}</div>
								<DropdownComponent
									name={`status.${index}`}
									value={dropDownValue[`status.${index}`]}
									options={status}
									loanStatus={loan.LoanApplication_Status}
									onSubmit={(event) =>
										handleSubmit(
											event,
											loan.LoanApplication_ID,
											`status.${index}`
										)
									}
									onChange={(e) => handleChange(e, `status.${index}`)}
								/>
							</div>
						</>
					))
				) : (
					<h1>No Loan Data Found </h1>
				)}
			</div>
		</>
	);
}

export default Banker;
