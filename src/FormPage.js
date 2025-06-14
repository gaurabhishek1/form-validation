import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormPage.css";

function FormPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneCode: "",
    phoneNumber: "",
    country: "",
    city: "",
    pan: "",
    aadhar: ""
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = (data = formData) => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const aadharRegex = /^\d{12}$/;
    const phoneRegex = /^\d{10}$/;

    if (!data.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!data.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!data.username.trim()) newErrors.username = "Username is required.";
    if (!emailRegex.test(data.email)) newErrors.email = "Invalid email.";
    if (!data.password) newErrors.password = "Password is required.";
    if (!data.phoneCode || !phoneRegex.test(data.phoneNumber)) {
      newErrors.phone = "Valid phone number is required.";
    }
    if (!data.country) newErrors.country = "Country is required.";
    if (!data.city) newErrors.city = "City is required.";
    if (!panRegex.test(data.pan)) newErrors.pan = "Invalid PAN number.";
    if (!aadharRegex.test(data.aadhar)) newErrors.aadhar = "Invalid Aadhar number.";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors(validate({ ...formData, [name]: value }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(validate(formData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    if (Object.keys(validationErrors).length === 0) {
      navigate("/success", { state: formData });
    }
  };

  const renderField = (label, name, type = "text") => (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      {touched[name] && errors[name] && <span className="error">{errors[name]}</span>}
    </div>
  );

  return (
    <div className="form-container">
      <form className="form-box" onSubmit={handleSubmit}>
        <h2>React Registration Form</h2>
        <div className="form-row">
          {renderField("First Name", "firstName")}
          {renderField("Last Name", "lastName")}
        </div>
        <div className="form-row">
          {renderField("Username", "username")}
          {renderField("E-mail", "email", "email")}
        </div>
        <div className="form-row">
          {renderField("Phone Code", "phoneCode")}
          {renderField("Phone Number", "phoneNumber")}
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </button>
            {touched.password && errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div className="form-group">
            <label>Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            >
              <option value="">Select</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
            </select>
            {touched.country && errors.country && <span className="error">{errors.country}</span>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>City</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            >
              <option value="">Select</option>
              {formData.country === "India" && (
                <>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                </>
              )}
              {formData.country === "USA" && (
                <>
                  <option value="New York">New York</option>
                  <option value="Chicago">Chicago</option>
                </>
              )}
            </select>
            {touched.city && errors.city && <span className="error">{errors.city}</span>}
          </div>
          {renderField("PAN Number", "pan")}
        </div>
        <div className="form-row">
          {renderField("Aadhar Number", "aadhar")}
        </div>
        <button className="submit-btn" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormPage;
