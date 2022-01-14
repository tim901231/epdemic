import React from "react";
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
import { Button } from "@mui/material";
import { cities } from "../constants/cities";
import { edges } from "../constants/edgesDrawing";

function GameBoard({ virus, players, setCity }) {
  //console.log(cities);
  let image = new window.Image();
  image.src = "https://i.imgur.com/v4mD7Mw.jpg";
  return (
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
              onClick={() => {
                alert(i);
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
              onClick={() => alert(city.city)}
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
              onClick={() => alert(city.city)}
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
              onClick={() => alert(city.city)}
            ></Star>
          </>
        ))}
        {/* <Circle
          x={"110"}
          y={"185"}
          radius={8}
          fill="blue"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"190"}
          y={"210"}
          radius={8}
          fill="blue"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"200"}
          y={"255"}
          radius={8}
          fill="blue"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"240"}
          y={"185"}
          radius={8}
          fill="blue"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"270"}
          y={"220"}
          radius={8}
          fill="blue"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"245"}
          y={"250"}
          radius={8}
          fill="blue"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"495"}
          y={"140"}
          radius={8}
          fill="blue"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"480"}
          y={"225"}
          radius={8}
          fill="blue"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"520"}
          y={"190"}
          radius={8}
          fill="blue"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"570"}
          y={"165"}
          radius={8}
          fill="blue"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"560"}
          y={"225"}
          radius={8}
          fill="blue"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"625"}
          y={"130"}
          radius={8}
          fill="blue"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"125"}
          y={"235"}
          radius={8}
          fill="yellow"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"170"}
          y={"290"}
          radius={8}
          fill="yellow"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"240"}
          y={"300"}
          radius={8}
          fill="yellow"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"260"}
          y={"370"}
          radius={8}
          fill="yellow"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"250"}
          y={"440"}
          radius={8}
          fill="yellow"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"250"}
          y={"520"}
          radius={8}
          fill="yellow"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"360"}
          y={"480"}
          radius={8}
          fill="yellow"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"300"}
          y={"560"}
          radius={8}
          fill="yellow"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"530"}
          y={"360"}
          radius={8}
          fill="yellow"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"610"}
          y={"340"}
          radius={8}
          fill="yellow"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"580"}
          y={"410"}
          radius={8}
          fill="yellow"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"580"}
          y={"510"}
          radius={8}
          fill="yellow"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"515"}
          y={"285"}
          radius={8}
          fill="black"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"655"}
          y={"180"}
          radius={8}
          fill="black"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"590"}
          y={"285"}
          radius={8}
          fill="black"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"615"}
          y={"225"}
          radius={8}
          fill="black"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"710"}
          y={"190"}
          radius={8}
          fill="black"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"670"}
          y={"245"}
          radius={8}
          fill="black"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"655"}
          y={"300"}
          radius={8}
          fill="black"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"715"}
          y={"270"}
          radius={8}
          fill="black"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"750"}
          y={"235"}
          radius={8}
          fill="black"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"750"}
          y={"315"}
          radius={8}
          fill="black"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"800"}
          y={"280"}
          radius={8}
          fill="black"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"790"}
          y={"355"}
          radius={8}
          fill="black"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"835"}
          y={"320"}
          radius={8}
          fill="red"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"795"}
          y={"420"}
          radius={8}
          fill="red"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"855"}
          y={"200"}
          radius={8}
          fill="red"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"865"}
          y={"255"}
          radius={8}
          fill="red"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"875"}
          y={"295"}
          radius={8}
          fill="red"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"920"}
          y={"390"}
          radius={8}
          fill="red"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"855"}
          y={"400"}
          radius={8}
          fill="red"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"900"}
          y={"220"}
          radius={8}
          fill="red"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"945"}
          y={"250"}
          radius={8}
          fill="red"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"970"}
          y={"290"}
          radius={8}
          fill="red"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"925"}
          y={"305"}
          radius={8}
          fill="red"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"970"}
          y={"525"}
          radius={8}
          fill="red"
          onClick={() => alert("hello")}
        /> */}
      </Layer>
    </Stage>
  );
}

export default GameBoard;
