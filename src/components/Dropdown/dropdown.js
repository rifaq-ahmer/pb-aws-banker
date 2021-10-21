import "./dropdown.css";

function DropdownComponent({
	name,
	options,
	onSubmit,
	onChange,
	loanStatus,
	value,
}) {
	return (
		<div>
			<form onSubmit={onSubmit} onChange={onChange} className="custom-dropdown">
				<select
					id={name}
					name={name}
					value={value || loanStatus}
					disabled={loanStatus === 8}
				>
					{options.map((option) => (
						<option key={option.status} value={option.status}>
							{option.status_ID}
						</option>
					))}
				</select>

				<input type="submit" value="Submit" />
			</form>
		</div>
	);
}

export default DropdownComponent;
