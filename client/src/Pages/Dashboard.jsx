import React, { createContext, useContext } from "react";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

const DashboardContext = createContext();

export const loader = async () => {
  try {
    // Fetch user data
    const userResponse = await customFetch("/users/current-user");
    const user = userResponse.data.user || null; // Return null if no user

    if (!user) {
      // If no user is returned, redirect to login or homepage
      toast.error("User not logged in. Redirecting to homepage.");
      return redirect("/"); // Redirect to login or home
    }

    // Fetch registered games using the user ID
    const gamesResponse = await customFetch(
      `/users/${user._id}/registered-games`
    );
    const registeredGames = gamesResponse.data.registeredGames || []; // Ensure an empty array if none found

    return { user, registeredGames };
  } catch (error) {
    toast.error("Login to Explore");
    return redirect("/"); // Redirect to home or login if there's an error
  }
};

const Dashboard = () => {
  const data = useLoaderData(); // Get user data and registered games from the loader
  const navigate = useNavigate(); // Initialize navigate for routing

  if (!data || !data.user) {
    // Handle case where user is not loaded
    return (
      <div>
        Loading... Please wait or <Link to="/">go back to the homepage.</Link>
      </div>
    );
  }

  const { user, registeredGames } = data;

  const logoutUser = async () => {
    try {
      await customFetch.get("/auth/logout");
      toast.success("Logging out...");
      navigate("/"); // Navigate to home page after logout
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout failed:", error);
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        user, // Provide user data
        registeredGames, // Provide registered games data
        logoutUser, // Provide logout function
      }}
    >
      <div>
        <Outlet /> {/* Render child routes */}
      </div>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default Dashboard;
