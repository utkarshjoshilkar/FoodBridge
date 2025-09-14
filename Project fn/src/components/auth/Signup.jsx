import React, { useState } from "react";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import Checkbox from "@mui/joy/Checkbox";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LocationOn from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import BadgeIcon from "@mui/icons-material/Badge";
import PasswordIcon from "@mui/icons-material/Password";
import Select from "@mui/joy/Select";
import Link from "@mui/joy/Link";
import Option from "@mui/joy/Option";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Signupform() {
  const [isFoodSource, setIsFoodSource] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    pincode: "", // Changed to pincode
    password: "",
    isFoodSource: false,
    foodSourceName: "",
    foodSourceType: "",
    foodSourceLocation: "",
    foodSourcePinCode: "", // Changed to foodSourcePinCode
  });
  const navigate = useNavigate();

  const handleSourceChange = (e) => {
    setIsFoodSource(e.target.checked);
    setRegisterData({ ...registerData, isFoodSource: e.target.checked });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData({
      ...registerData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:3000/api/donor/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: registerData.name,
          email: registerData.email,
          phone: registerData.phone,
          location: registerData.location,
          pincode: registerData.pincode,
          password: registerData.password,
          foodSource: isFoodSource ? {
            sourceType: registerData.foodSourceType,
            sourceName: registerData.foodSourceName,
            sourceLocation: registerData.foodSourceLocation,
            pincode: registerData.foodSourcePinCode
          } : undefined
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred during registration.");
    }
  };

  return (
    // ... (rest of your component remains the same)
      <Card
        variant="outlined"
        sx={{
          maxHeight: "max-content",
          maxWidth: "40%",
          mx: "auto",
        }}
      >
        <Typography level="title-lg" startDecorator={<HowToRegIcon />}>
          Signup
        </Typography>
        <Divider inset="none" />
        <CardContent
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
            gap: 1.5,
          }}
        >
          <FormControl sx={{ gridColumn: "1/-1" }}>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={registerData.name}
              onChange={handleChange}
              endDecorator={<BadgeIcon />}
            />
          </FormControl>
          <FormControl sx={{ gridColumn: "1/-1" }}>
            <FormLabel>Phone</FormLabel>
            <Input
              name="phone"
              value={registerData.phone}
              onChange={handleChange}
              endDecorator={<LocalPhoneIcon />}
            />
          </FormControl>
          <FormControl sx={{ gridColumn: "1/-1" }}>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              value={registerData.email}
              onChange={handleChange}
              placeholder="Enter donor's email"
              endDecorator={<EmailIcon />}
            />
          </FormControl>
          <FormControl sx={{ gridColumn: "1/-1" }}>
            <FormLabel>Location</FormLabel>
            <Input
              name="location"
              value={registerData.location}
              onChange={handleChange}
              placeholder="Your location"
              startDecorator={
                <Button
                  variant="soft"
                  color="neutral"
                  startDecorator={<LocationOn />}
                >
                  Locate
                </Button>
              }
              sx={{ width: `100%` }}
            />
          </FormControl>
          <FormControl sx={{ gridColumn: "1/-1" }}>
            <FormLabel>Pin Code</FormLabel>
            <Input
              name="pincode"
              value={registerData.pincode}
              onChange={handleChange}
              placeholder="Your Pin Code"
            />
          </FormControl>

          <FormControl sx={{ gridColumn: "1/-1" }}>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              value={registerData.password}
              onChange={handleChange}
              type="password"
              endDecorator={<PasswordIcon />}
            />
          </FormControl>
          <Checkbox
            label="Are you a Food Source?"
            sx={{ gridColumn: "1/-1", my: 1 }}
            checked={isFoodSource}
            onChange={handleSourceChange}
          />
          {isFoodSource ? (
            <>
              <FormControl sx={{ gridColumn: "1/-1" }}>
                <FormLabel>Food Source Name</FormLabel>
                <Input
                  name="foodSourceName"
                  value={registerData.foodSourceName}
                  onChange={handleChange}
                  placeholder="Enter food source name"
                  endDecorator={<EmailIcon />}
                />
              </FormControl>
              <FormControl sx={{ gridColumn: "1/-1" }}>
                <FormLabel>Food Source Phone</FormLabel>
                <Input
                  name="foodSourcePhone"
                  value={registerData.foodSourcePhone}
                  onChange={handleChange}
                  endDecorator={<LocalPhoneIcon />}
                />
              </FormControl>
              <FormControl sx={{ gridColumn: "1/-1" }}>
                <FormLabel>Select source Type</FormLabel>
                <Select
                  placeholder="Select source Type"
                  value={registerData.foodSourceType}
                  onChange={(event, newValue) =>
                    setRegisterData({
                      ...registerData,
                      foodSourceType: newValue,
                    })
                  }
                >
                  <Option value="Hotel">Hotel</Option>
                  <Option value="Restaurant">Restaurant</Option>
                  <Option value="Hall">Hall</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "1/-1" }}>
                <FormLabel>Food Source Location</FormLabel>
                <Input
                  name="foodSourceLocation"
                  value={registerData.foodSourceLocation}
                  onChange={handleChange}
                  placeholder="Food source location"
                  startDecorator={
                    <Button
                      variant="soft"
                      color="neutral"
                      startDecorator={<LocationOn />}
                    >
                      Locate
                    </Button>
                  }
                />
              </FormControl>
              <FormControl sx={{ gridColumn: "1/-1" }}>
                <FormLabel>Food Source Pin Code</FormLabel>
                <Input
                  name="foodSourcePinCode"
                  value={registerData.foodSourcePinCode}
                  onChange={handleChange}
                  placeholder="Food source pin code"
                />
              </FormControl>
            </>
          ) : null}
          <p>
            Aready Registered?
            <Link href="/login">Login</Link>
          </p>
          <CardActions sx={{ gridColumn: "1/-1" }}>
            <Button variant="solid" color="primary" onClick={handleSubmit}>
              Signup
            </Button>
          </CardActions>
        </CardContent>
      </Card>
  );
}

export default Signupform;