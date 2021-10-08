import React, { useState, useEffect } from "react";
import DropdownComponent from "../Dropdown/dropdown";
import axios from "axios";

import "./banker.css";

function Banker() {
	const [status, setStatus] = useState([]);
	const [loanData, setLoanData] = useState([]);
	let currentStatus = "";

	useEffect(() => {
		axios
			.get(
				"https://g9yh14f7ve.execute-api.ap-south-1.amazonaws.com/Authorizeddev/getloanstatustypebanker/loanstatus"
			)
			.then((res) => setStatus(res.data))
			.catch((error) => console.log(error));

		axios
			.get(
				"https://dc1nrv6pua.execute-api.ap-south-1.amazonaws.com/dev/loanapproval/banker"
			)

			.then((res) => setLoanData(res.data))
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
				`https://dc1nrv6pua.execute-api.ap-south-1.amazonaws.com/dev/creditapproval/creditor/${id}`,

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
				{loanData.map((loan) => (
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
				))}
			</div>
		</>
	);
}

export default Banker;
