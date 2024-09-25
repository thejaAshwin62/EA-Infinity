import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ContactImg from "../assets/contact.svg";

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const serviceId = "service_nkh3h2o";
    const templateId = "template_9j52fmf";
    const publicKey = "H-Pf9nDC3WyS-5kuc";
    const toName = "Theja Ashwin";
    const toEmail = "thejaashwin62@gmail.com";

    const templateParams = {
      from_name: form.name,
      to_name: toName,
      from_email: form.email,
      to_email: toEmail,
      message: form.message,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey).then(
      (response) => {
        setLoading(false);
        toast.success("Your response was sent successfully", response);
        setForm({
          name: "",
          email: "",
          message: "",
        });
      },
      (error) => {
        setLoading(false);
        toast.error("Ahh, something went wrong. Please try again.");
      }
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: isMobile ? "100vh" : "35rem",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: isMobile ? "center" : "space-between",
        margin: isMobile ? 0 : "1.4rem 0",
      }}
    >
      {/* Back Button */}
      <Box
        sx={{
          position: "absolute",
          top: theme.spacing(2),
          left: theme.spacing(3),
          zIndex: 1300,
        }}
      >
        <Button
          color="primary"
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{
            borderRadius: 2,
            padding: "0.5rem 1rem",
            textTransform: "none",
            color: "white",
            borderColor: "white",
            "&:hover": {
              borderColor: "lightgray",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          Back
        </Button>
      </Box>

      {/* Contact Image - Hidden on Mobile */}
      {!isMobile && (
        <Box sx={{ paddingLeft: "15rem" }}>
          <img src={ContactImg} alt="Contact Illustration" />
        </Box>
      )}

      {/* Contact Form */}
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          justifyContent: isMobile ? "center" : "flex-end",
          marginTop: "5rem",
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.grey[900],
            padding: theme.spacing(3),
            borderRadius: theme.shape.borderRadius,
            overflow: "hidden",
            width: "100%",
            maxWidth: "400px",
          }}
          elevation={3}
        >
          <Typography
            variant="h4"
            color="white"
            sx={{ marginBottom: theme.spacing(3), textAlign: "center" }}
          >
            Contact.
          </Typography>

          <form ref={formRef} onSubmit={handleSubmit}>
            <Box mb={3}>
              <Typography
                variant="body1"
                color="white"
                sx={{ marginBottom: theme.spacing(1) }}
              >
                Your Name
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your good name?"
                sx={{
                  backgroundColor: theme.palette.grey[800],
                  "& .MuiInputBase-root": {
                    color: theme.palette.common.white,
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme.palette.grey[600],
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </Box>

            <Box mb={3}>
              <Typography
                variant="body1"
                color="white"
                sx={{ marginBottom: theme.spacing(1) }}
              >
                Your Email
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your web address?"
                sx={{
                  backgroundColor: theme.palette.grey[800],
                  "& .MuiInputBase-root": {
                    color: theme.palette.common.white,
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme.palette.grey[600],
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </Box>

            <Box mb={3}>
              <Typography
                variant="body1"
                color="white"
                sx={{ marginBottom: theme.spacing(1) }}
              >
                Your Message
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What do you want to say?"
                multiline
                rows={4}
                sx={{
                  backgroundColor: theme.palette.grey[800],
                  "& .MuiInputBase-root": {
                    color: theme.palette.common.white,
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme.palette.grey[600],
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ mt: 2 }}
            >
              {loading ? "Sending..." : "Send"}
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
