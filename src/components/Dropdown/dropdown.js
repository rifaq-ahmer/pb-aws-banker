import React from "react";

import "./dropdown.css";

function DropdownComponent({ options, onSubmit, onChange }) {
	return (
		<form onSubmit={onSubmit} onChange={onChange} className="custom-dropdown">
			<select values={options.status}>
				{options.map((option) => (
					<option key={options.status} value={option.status}>
						{option.status_ID}
					</option>
				))}
			</select>

			<input type="submit" value="Submit" />
		</form>
	);
}

export default DropdownComponent;
