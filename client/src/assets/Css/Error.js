import styled from "styled-components";

const Wrapperr = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;

  img {
    width: 100%;
    max-width: 600px;
    height: auto; // Maintain aspect ratio
    display: block;
    margin-bottom: 1.5rem;
    margin-top: 0;
    margin-left: 1.7rem;
  }

  h3 {
    margin-bottom: 0.5rem;
    color: white; // Make the heading white
  }

  p {
    line-height: 1.5;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    color: white; // Make the paragraph text white
  }

  a {
    color: blue; // Make the link text white
    text-transform: capitalize;
    text-decoration: none; // Optional: Remove underline if you prefer
  }

  a:hover {
    text-decoration: underline; // Optional: Add underline on hover
  }
`;

export default Wrapperr;
