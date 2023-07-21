import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Table, FormControl } from "react-bootstrap";
import "./viewuser.css";
import Alert from "react-bootstrap/Alert";
const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editMode, setEditMode] = useState(-1);
  const [update, setUpdate] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const recordsPerPage = 5;

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/delete_user/${id}`);

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      setDeleted(true);
      setTimeout(() => {
        setDeleted(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8800/get_users");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const filteredUsers = users.filter((user) =>
    Object.values(user).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const currentRecords = filteredUsers.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (index) => {
    setEditMode(index);
  };

  const handleSave = async (index) => {
    setEditMode(-1); // Disable edit mode after saving changes
    const updatedUsers = [...users];
    updatedUsers[index] = { ...currentRecords[index] }; // Copy the data object

    // Update the properties you want to change based on the input fields
    updatedUsers[index].First_Name = document.getElementById(
      `first_name_${index}`
    ).value;
    updatedUsers[index].Last_Name = document.getElementById(
      `last_name_${index}`
    ).value;
    updatedUsers[index].Gender = document.getElementById(
      `gender_${index}`
    ).value;
    updatedUsers[index].DOB = document.getElementById(`dob_${index}`).value;
    updatedUsers[index].City = document.getElementById(`city_${index}`).value;
    updatedUsers[index].Zip_Code = document.getElementById(
      `zip_${index}`
    ).value;
    updatedUsers[index].Country = document.getElementById(
      `country_${index}`
    ).value;
    updatedUsers[index].State = document.getElementById(`state_${index}`).value;
    updatedUsers[index].Area_Of_Interest = document.getElementById(
      `interest_${index}`
    ).value;
    updatedUsers[index].Email = document.getElementById(`email_${index}`).value;

    try {
      // Send the updated user data to the backend
      await axios.put(
        `http://localhost:8800/update_user/${updatedUsers[index].id}`,
        updatedUsers[index]
      );
      setUsers(updatedUsers); // Update the state after successful update
      setUpdate(true);
      setTimeout(() => {
        setUpdate(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordChange = async (index) => {
    const newPassword = document.getElementById(`password_${index}`).value;
    if (newPassword.trim() === "") {
      alert("Password cannot be empty!");
      return;
    }

    try {
      // Send the updated password data to the backend
      await axios.put(
        `http://localhost:8800/update_password/${currentRecords[index].id}`,
        { Password: newPassword }
      );
      alert("Password updated successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {update ? (
        <Alert key="success" variant="success">
          Detials Updated
        </Alert>
      ) : (
        ""
      )}
      {deleted ? (
        <Alert key="danger" variant="danger">
          Record Deleted
        </Alert>
      ) : (
        ""
      )}
      <Container>
        {/* Search input */}
        <Row className="my-3">
          <Col md={12}>
            <FormControl
              type="text"
              placeholder="Search for users..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col md={14}>
            <Table
              style={{ overflowX: "scroll", display: "block" }}
              striped
              bordered
              hover
              size="sm"
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Gender</th>
                  <th>DOB</th>
                  <th>City</th>
                  <th>Zip</th>
                  <th>Country</th>
                  <th>State</th>
                  <th>Area Of Interest</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((user, index) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      {editMode === index ? (
                        <FormControl
                          id={`first_name_${index}`}
                          defaultValue={user.First_Name}
                        />
                      ) : (
                        user.First_Name
                      )}
                    </td>
                    <td>
                      {editMode === index ? (
                        <FormControl
                          id={`last_name_${index}`}
                          defaultValue={user.Last_Name}
                        />
                      ) : (
                        user.Last_Name
                      )}
                    </td>
                    <td>
                      {editMode === index ? (
                        <FormControl
                          id={`gender_${index}`}
                          defaultValue={user.Gender}
                        />
                      ) : (
                        user.Gender
                      )}
                    </td>
                    <td>
                      {editMode === index ? (
                        <FormControl
                          id={`dob_${index}`}
                          defaultValue={user.DOB}
                        />
                      ) : (
                        user.DOB
                      )}
                    </td>
                    <td>
                      {editMode === index ? (
                        <FormControl
                          id={`city_${index}`}
                          defaultValue={user.City}
                        />
                      ) : (
                        user.City
                      )}
                    </td>
                    <td>
                      {editMode === index ? (
                        <FormControl
                          id={`zip_${index}`}
                          defaultValue={user.Zip_Code}
                        />
                      ) : (
                        user.Zip_Code
                      )}
                    </td>
                    <td>
                      {editMode === index ? (
                        <FormControl
                          id={`country_${index}`}
                          defaultValue={user.Country}
                        />
                      ) : (
                        user.Country
                      )}
                    </td>
                    <td>
                      {editMode === index ? (
                        <FormControl
                          id={`state_${index}`}
                          defaultValue={user.State}
                        />
                      ) : (
                        user.State
                      )}
                    </td>
                    <td>
                      {editMode === index ? (
                        <FormControl
                          id={`interest_${index}`}
                          defaultValue={user.Area_Of_Interest}
                        />
                      ) : (
                        user.Area_Of_Interest
                      )}
                    </td>
                    <td>
                      {editMode === index ? (
                        <FormControl
                          id={`email_${index}`}
                          defaultValue={user.Email}
                        />
                      ) : (
                        user.Email
                      )}
                    </td>
                    <td>
                      {editMode === index ? (
                        <FormControl
                          id={`password_${index}`}
                          type="password"
                          placeholder="Enter new password"
                        />
                      ) : (
                        "**********"
                      )}
                    </td>
                    <td>
                      {editMode === index ? (
                        <span
                          className="material-symbols-outlined"
                          onClick={() => handleSave(index)}
                        >
                          save
                        </span>
                      ) : (
                        <span
                          className="material-symbols-outlined"
                          onClick={() => handleEdit(index)}
                        >
                          edit
                        </span>
                      )}
                    </td>
                    <td>
                      {editMode === index ? (
                        <span
                          className="material-symbols-outlined"
                          onClick={() => handlePasswordChange(index)}
                        >
                          update password
                        </span>
                      ) : (
                        <span
                          className="material-symbols-outlined"
                          onClick={() => handleDelete(user.id)}
                        >
                          delete
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {/* Pagination */}
            <div>
              {Array.from(
                { length: Math.ceil(filteredUsers.length / recordsPerPage) },
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    disabled={currentPage === index + 1}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ViewUsers;
