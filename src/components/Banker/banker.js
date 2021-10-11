import React, { useState, useEffect } from "react";
import DropdownComponent from "../Dropdown/dropdown";
import axios from "axios";
import { API_ENDPOINT } from "../../App";
import "./banker.css";

function Banker() {
	const [status, setStatus] = useState([]);
	const [loanData, setLoanData] = useState([]);
	let currentStatus = "";

	axios.defaults.headers.common["Authorization"] =
		"eyJraWQiOiJrSURWK2lTS0RvMU5mMGJHbjhSUlpiMnNIdE1jYVJmS2JZMDB6eWVXM29rPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5ZWIzYzZlNy1lMjM5LTRlZTQtYWUxOC1mMjNiNmU0NzhkN2UiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNjMzOTUxMjgxLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xX2hFamF6OGdxcyIsImV4cCI6MTYzNDAzNzY4MSwiaWF0IjoxNjMzOTUxMjgxLCJ2ZXJzaW9uIjoyLCJqdGkiOiI5YzUzMjVmNi1jODZjLTRmZGItODc5My01OGJjZjkzZTQ5MDEiLCJjbGllbnRfaWQiOiIzNHNvNGplcjQ0dTJwMzlmZmpxYmxuN2N2dCIsInVzZXJuYW1lIjoicHJhdmluIn0.p2ZcFiSffczFijC0prB79KC_H_MoJnI67Vsb8WIRQk2okzLLHjBFkmNdY6ssd6OJ5NIN2nvXf90COQuillmnYvGj-z7qdp-ZvQOSNBrkS_kXUQnN-lDqTToF00ZgzjxVWOoMFqD93uVufpwNLDp_taMeAnyd4ZkvxSdBjV6D3Twi-yiCqs4IJsfjXVYJozt32ONBi0k4Ghc2F66DWtlQRSLe6g7W7xHJ7Lnd9jAWfg4kBn33t4QCLDmrbzWTjPIaIEXJlDdjkohe2aDGt0G7DilwP7508Sk19CNCSxPs75sOtWvH7mVjKz9cXApjyf-d4vFtSLIRrtsuiRlnGKpXLg";
	useEffect(() => {
		axios
			.get(`${API_ENDPOINT}/getloanstatustypebanker/loanstatus`)
			.then((res) => setStatus(res.data))
			.catch((error) => console.log(error));

		axios
			.get(`${API_ENDPOINT}/loanapproval/banker`)

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
