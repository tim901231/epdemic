import React, { useState } from "react";
import Konva from "konva";
import {
  Layer,
  Rect,
  Stage,
  Group,
  Circle,
  Image,
  Text,
  Line,
  Star,
} from "react-konva";
import { Button, Snackbar, Alert } from "@mui/material";
import { cities } from "../constants/cities";
import { edges } from "../constants/edgesDrawing";

function GameBoard({ virus, players, setCity }) {
  //console.log(cities);
  const [open, setOpen] = useState(false);
  const [hoverCity, setHoverCity] = useState("");
  let image = new window.Image();
  image.src = "https://i.imgur.com/v4mD7Mw.jpg";
  return (
    <>
      <Stage width={window.innerWidth} height={620}>
        {/* <Layer>
        {/* <Button></Button> */}
        {/* {players.length > 0 ? (
          <>
            <Rect x={1070} y={550} width={110} height={70} fill="red"></Rect>
            <Text x={1070} y={550} text={players[0].playerId}></Text>
            <Rect x={1415} y={550} width={110} height={70} fill="red"></Rect>
            <Text x={1415} y={550} text={players[1].playerId}></Text>
            <Rect x={1185} y={550} width={110} height={70} fill="red"></Rect>
            <Text x={1185} y={550} text={players[2].playerId}></Text>
            <Rect x={1300} y={550} width={110} height={70} fill="red"></Rect>
            <Text x={1300} y={550} text={players[3].playerId}></Text>
          </>
        ) : null} 
      </Layer> */}
        <Layer>
          <Image
            x={"10"}
            y={"10"}
            image={image}
            width={1050}
            height={620}
          ></Image>
        </Layer>
        <Layer>
          {edges.map((edge, i) => {
            return edge.map((city) => {
              // console.log(
              //   cities[i].x,
              //   cities[i].y,
              //   cities[city].x,
              //   cities[city].y
              // );
              return (
                <Line
                  key={i + "_" + city}
                  points={[
                    cities[i].x,
                    cities[i].y,
                    cities[city].x,
                    cities[city].y,
                  ]}
                  stroke={"lightgreen"}
                  strokeWidth={3}
                ></Line>
              );
            });
          })}
          <Line
            points={[975, 525, 1060, 401.75]}
            stroke={"lightgreen"}
            strokeWidth={3}
          ></Line>
          <Line
            points={[10, 401.75, 125, 235]}
            stroke={"lightgreen"}
            strokeWidth={3}
          ></Line>
          <Line
            points={[945, 250, 1060, 216.78]}
            stroke={"lightgreen"}
            strokeWidth={3}
          ></Line>
          <Line
            points={[10, 216.78, 110, 185]}
            stroke={"lightgreen"}
            strokeWidth={3}
          ></Line>
          <Line
            points={[920, 390, 1060, 270.42]}
            stroke={"lightgreen"}
            strokeWidth={3}
          ></Line>
          <Line
            points={[10, 270.42, 110, 185]}
            stroke={"lightgreen"}
            strokeWidth={3}
          ></Line>
        </Layer>
        <Layer>
          {cities.map((city, i) => (
            <>
              <Circle
                key={city.city}
                id={city.city}
                x={city.x}
                y={city.y}
                radius={8}
                fill={city.color}
                onMouseOver={() => {
                  // alert("test");
                  setOpen(true);
                  setHoverCity(city.name);
                }}
                onMouseLeave={() => {
                  setOpen(false);
                }}
                onClick={() => {
                  setCity(i);
                }}
              ></Circle>
              <Star
                key={city.city + "one"}
                id={city.city + ""}
                x={city.x}
                y={parseInt(city.y) + 15}
                innerRadius={3}
                outerRadius={6}
                fill={virus[i] > 1 ? city.color : null}
                stroke={city.color}
                strokeWidth={1}
              ></Star>
              <Star
                key={city.city + "two"}
                id={city.city + ""}
                x={parseInt(city.x) - 10}
                y={parseInt(city.y) + 15}
                innerRadius={3}
                outerRadius={6}
                fill={virus[i] > 0 ? city.color : null}
                stroke={city.color}
                strokeWidth={1}
              ></Star>
              <Star
                key={city.city + "three"}
                id={city.city + ""}
                x={parseInt(city.x) + 10}
                y={parseInt(city.y) + 15}
                innerRadius={3}
                outerRadius={6}
                stroke={city.color}
                strokeWidth={1}
                fill={virus[i] > 2 ? city.color : null}
                stroke={city.color}
                strokeWidth={1}
              ></Star>
            </>
          ))}
        </Layer>
      </Stage>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="info"
          sx={{ width: "100%" }}
        >
          {hoverCity}
        </Alert>
      </Snackbar>
    </>
  );
}

export default GameBoard;
