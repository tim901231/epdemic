import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import CommuteIcon from "@mui/icons-material/Commute";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import SchoolIcon from "@mui/icons-material/School";
import ScienceIcon from "@mui/icons-material/Science";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import { edges } from "../constants/edges";
import { cities } from "../constants/cities";

export default function MoveSelector({
  city,
  pos,
  hand,
  move,
  fly,
  flyfrom,
  lab,
  treat,
}) {
  console.log(pos);
  // console.log("city", city);
  // console.log(hand);
  console.log(hand);
  const check = () => {
    console.log(hand.filter((card) => card < 12).length);
    if (hand.filter((card) => card < 12).length > 4) {
      console.log("true");
      return true;
    }
    return false;
  };
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 250,
        bgcolor: "background.paper",
        mt: "10px",
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton
            disabled={!edges[pos].includes(city)}
            onClick={() => {
              // alert("hi");
              move();
            }}
          >
            <ListItemIcon>
              <CommuteIcon />
            </ListItemIcon>
            <ListItemText primary={"Drive/Ferry：" + cities[city].name} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton disabled={!hand.includes(city)} onClick={() => fly()}>
            <ListItemIcon>
              <FlightLandIcon />
            </ListItemIcon>
            <ListItemText primary={"Direct Flight：" + cities[city].name} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            disabled={!hand.includes(pos)}
            onClick={() => flyfrom()}
          >
            <ListItemIcon>
              <FlightTakeoffIcon />
            </ListItemIcon>
            <ListItemText primary={"Charter Flight：" + cities[city].name} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton disabled={true}>
            <ListItemIcon>
              <CompareArrowsIcon />
            </ListItemIcon>
            <ListItemText primary={"Shuttle Flight：" + cities[city].name} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton disabled={!hand.includes(pos)} onClick={() => lab()}>
            <ListItemIcon>
              <OtherHousesIcon />
            </ListItemIcon>
            <ListItemText primary="Build Lab" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => treat()}>
            <ListItemIcon>
              <MedicalServicesIcon />
            </ListItemIcon>
            <ListItemText primary="Treat Disease" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton disabled={true}>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Share Card" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton disabled>
            <ListItemIcon>
              <ScienceIcon />
            </ListItemIcon>
            <ListItemText primary="Discover Cure" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
