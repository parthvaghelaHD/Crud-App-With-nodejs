const fs = require('fs');
const db = 'data.json';
const user_records = JSON.parse(fs.readFileSync(db));

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
	let msg;
	const userData = JSON.parse(data);
	user_records.some(items => {
		flag = false;
		if (items.id != userData.id) {
			if (items.name != userData.name) {
				if (items.email != userData.email) {
					flag = true;
				} else {
					msg = "mail is not matched";
				}

			} else {
				msg = "name is not matched";
			}
		}
		else {
			msg = "Id is not matched";
		}
	})
	if (flag) {
		user_records.push(userData);
		fs.writeFileSync(db, JSON.stringify(user_records))
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