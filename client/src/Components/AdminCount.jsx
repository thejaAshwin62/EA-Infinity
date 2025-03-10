import { Box, Typography } from "@mui/material";
import React from "react";
import { useLoaderData } from "react-router-dom";
import StatsItem from "./StatsItem";
import { FaSuitcaseRolling } from "react-icons/fa";
import { SiValorant, SiPubg } from "react-icons/si";
import { TbBrandFortnite } from "react-icons/tb";

export const ResponsiveGrid = ({ children }) => {
  return (
    <Box
      sx={{
        display: "grid",
        rowGap: "2rem",
        padding: { xs: "0 1rem", sm: "0 2rem", md: "0 4rem", lg: "0 10rem" }, // Responsive padding
        gridTemplateColumns: "1fr",
        "@media (min-width: 768px)": {
          gridTemplateColumns: "1fr 1fr",
          columnGap: "1rem",
        },
        "@media (min-width: 1120px)": {
          gridTemplateColumns: "1fr 1fr 1fr",
        },
      }}
    >
      {children}
    </Box>
  );
};

const AdminCount = () => {
  const { adminData } = useLoaderData();
  // console.log(adminData);

  const ValorantTotal = adminData.games.valorant;
  const PubgTotal = adminData.games.pubg_pc;
  const FortniteTotal = adminData.games.fortnite;

  const ValorantBooking = adminData.bookings.valorant;
  const PubgBooking = adminData.bookings.pubg_pc;
  const FortniteBooking = adminData.bookings.fortnite;

  return (
    <>
      <Typography
        sx={{
          color: "white",
          margin: "2rem",
          textAlign: "center",
          fontSize: { xs: "24px", md: "30px" }, // Responsive font size
        }}
      >
        Total Games
      </Typography>
      <ResponsiveGrid>
        <StatsItem
          title="Valorant"
          count={ValorantTotal}
          color="white"
          bcg="red"
          icon={<SiValorant />}
        />
        <StatsItem
          title="PUBG PC"
          count={PubgTotal}
          color="white"
          bcg="#96C4D6"
          icon={<SiPubg />}
        />
        <StatsItem
          title="Fortnite"
          count={FortniteTotal}
          color="white"
          bcg="#7302A1"
          icon={<TbBrandFortnite />}
        />
      </ResponsiveGrid>

      <Box>
        <Typography
          sx={{
            color: "white",
            margin: "2rem",
            textAlign: "center",
            fontSize: { xs: "24px", md: "30px" }, // Responsive font size
          }}
        >
          Booking Games
        </Typography>
      </Box>
      <ResponsiveGrid>
        <StatsItem
          title="Valorant"
          count={ValorantBooking}
          color="white"
          bcg="red"
          icon={<SiValorant />}
        />
        <StatsItem
          title="PUBG PC"
          count={PubgBooking}
          color="white"
          bcg="#96C4D6"
          icon={<SiPubg />}
        />
        <StatsItem
          title="Fortnite"
          count={FortniteBooking}
          color="white"
          bcg="#7302A1"
          icon={<TbBrandFortnite />}
        />
      </ResponsiveGrid>
      <Box>
        <Typography
          sx={{
            color: "white",
            margin: "2rem",
            textAlign: "center",
            fontSize: { xs: "24px", md: "30px" }, // Responsive font size
          }}
        >
          Total Users
        </Typography>
      </Box>
      <ResponsiveGrid>
        <StatsItem
          title="Current Users"
          count={adminData.totalUsers}
          color="black" // Set title color to black
          bcg="#fcefc7"
          icon={<FaSuitcaseRolling />}
        />
      </ResponsiveGrid>
    </>
  );
};

export default AdminCount;
