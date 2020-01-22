const fs = require('fs');
const db = 'data.json';
let flag = 0, userRecord = '';
const user_records = JSON.parse(fs.readFileSync(db));
const userArray = user_records.map((items) => { return items; });

function commonfun(statusCode, status, message, data = "") {
	let stats = {
		statusCode,
		status,
		message,
		data
	}
	return JSON.stringify(stats);
}

function addUser(data) {
	const userData = JSON.parse(data);
	let msg;
	user_records.some(items => {
		flag = 0;
		if (items.id === userData.id) {
			msg = 'id is already exist..!';
		} else if (items.name == userData.name) {
			msg = 'email is already exist..!';
		} else if (items.email == userData.email) {
			msg = 'contact is already exist..!';
		}

		if (items.id != userData.id) {
			if (items.name != userData.name) {
				if (items.email != userData.email) {
					flag = 1;
				}
			}
		}
	})

	if (flag = 1) {
		userArray.push(userData);
		fs.writeFile(db, JSON.stringify(userArray), function (err) {
			if (err) return commonfun("502", "Error", err);
		});
		return commonfun(200, 'Ok', 'User added Successfully');
	}
	else {
		return commonfun(200, 'Ok', msg);
	}
}

function deleteUser(data) {
	const deleteRecord = user_records.splice(user_records.findIndex(() => {
		return data.id;
	}), 1);

	if (deleteRecord == 1) {
		fs.writeFileSync(db, JSON.stringify(user_records));
		return commonfun("200", "OK", 'User Deleted Successfully..!');
	}
	else {
		return commonfun("200", "OK", "No User Found..!");
	}
}

function getUser(data) {
	const gettinguser = user_records.some((items) => {
		if (items.id == data.id) {
			finduser = items;
			return finduser;
		}
	});
	if (gettinguser) {
		return commonfun("200", "OK", 'User data load Successfully..!', finduser);
		console.log()
	}
	else {
		return commonfun("200", "OK", "No User Found..!");
	}
}

function updateUser(data) {
	const update = user_records.some((dbitems) => {
		if (dbitems.id == data.id) {
			Object.keys(data).forEach((items) => {
				if (items == 'name') {
					if (data.name != "") {
						dbitems.name = data.name;
					}
				}
				if (items == 'email') {
					if (data.email != "") {
						dbitems.email = data.email;
					}
				}
			});
		}
		return true;
	});
	if (update) {
		fs.writeFileSync(db, JSON.stringify(user_records));
		return commonfun("200", "OK", "User Updated successfully..!");
	}
	else {
		return commonfun("200", "OK", "No User Found..!");
	}
}

module.exports = {
	addUser,
	deleteUser,
	updateUser,
	getUser,
	commonfun
}