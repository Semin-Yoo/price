import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./App.css";
import XRP from "../src/logo/Ripple (XRP).png";
import ENTC from "../src/logo/entc.png";
import ETH from "../src/logo/Ethereum (ETH).png";
import BTC from "../src/logo/Bitcoin (BTC).png";
import "./App.css";

function App(app) {
  const [entcWon, setEntcWon] = useState([]);
  const [upBitBTC, setUpbitBTC] = useState([]);
  const [upBitETH, setUpbitETH] = useState([]);
  const [upBitXRP, setUpbitXRP] = useState([]);
  const [binance, setBinance] = useState([]);
  const [currency, setCurrency] = useState([]);

  const getData = async () => {
    axios
      .all([
        axios.get(
          "https://my-cors-s.herokuapp.com/https://www.bw.com/api/data/v1/ticker?marketId=4326"
        ),
        axios.get(
          "https://my-cors-s.herokuapp.com/https://api.upbit.com/v1/ticker?markets=KRW-BTC"
        ),
        axios.get(
          "https://my-cors-s.herokuapp.com/https://api.upbit.com/v1/ticker?markets=KRW-ETH"
        ),
        axios.get(
          "https://my-cors-s.herokuapp.com/https://api.upbit.com/v1/ticker?markets=KRW-XRP"
        ),
        axios.get(
          "https://my-cors-s.herokuapp.com/https://api.binance.com/api/v1/ticker/allPrices"
        ),
        axios.get(
          "https://my-cors-s.herokuapp.com/https://exchange.jaeheon.kr:23490/query/USDKRW"
        ),
      ])

      .then(
        axios.spread((res1, res2, res3, res4, res5, res6) => {
          setEntcWon(res1.data);
          setUpbitBTC(res2.data);
          setUpbitETH(res3.data);
          setUpbitXRP(res4.data);
          setBinance(res5.data);
          setCurrency(res6.data);
        })
      )
      .catch((error) => console.log(error));
  };

  console.log(upBitETH?.[0]?.trade_price);

  useEffect(() => {
    getData();
    setInterval(async () => {
      getData();
    }, 500000);
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      fontSize: 20,
      fontWeight: "bold",
      padding: "50px 100px 20px 100px",
    },
    [`&.${tableCellClasses.body}`]: {
      padding: "60px 100px 60px 100px",
      fontSize: 27,
      fontWeight: "bold",
    },
  }));
  const StyledPriceTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
      padding: "60px 100px 60px 100px",
      fontSize: 46,
      fontWeight: "bold",
    },
  }));

  function createData(name, upbit, binance, change) {
    return { name, upbit, binance, change };
  }

  function changeColor(num) {
    if (num > 0) styles.card.color = "red";
    else styles.card.color = "green";
  }

  const rows = [
    createData(
      "Bitcoin (BTC)",
      Number(upBitBTC?.find((a) => a?.market === "KRW-BTC")?.trade_price)
        .toFixed(0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      "$" +
        Number(binance?.find((a) => a?.symbol === "BTCUSDT")?.price).toFixed(2),
      (
        Number(
          upBitBTC?.find((a) => a?.market === "KRW-BTC")?.signed_change_rate
        ) * 100
      ).toFixed(2) + "%"
    ),
    createData(
      "Ethereum (ETH)",
      Number(upBitETH?.find((a) => a?.market === "KRW-ETH")?.trade_price)
        .toFixed(0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      "$" +
        Number(binance?.find((a) => a?.symbol === "ETHUSDT")?.price).toFixed(2),

      (
        Number(
          upBitETH?.find((a) => a?.market === "KRW-ETH")?.signed_change_rate
        ) * 100
      ).toFixed(2) + "%"
    ),
    createData(
      "Ripple (XRP)",
      Number(upBitXRP?.find((a) => a?.market === "KRW-XRP")?.trade_price)
        .toFixed(0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      "$" +
        Number(binance?.find((a) => a?.symbol === "XRPUSDT")?.price).toFixed(2),
      (
        Number(
          upBitXRP?.find((a) => a?.market === "KRW-XRP")?.signed_change_rate
        ) * 100
      ).toFixed(2) + "%"
    ),
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Crypto</StyledTableCell>
            <StyledTableCell align="center" colSpan={2}>
              Upbit
            </StyledTableCell>
            <StyledTableCell align="center" colSpan={2}>
              Binance
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <StyledTableCell align="left">
              <img src={ENTC} className="logo" colSpan={2} />
              ENTERBUTTON (ENTC)
            </StyledTableCell>
            <StyledPriceTableCell align="center" colSpan={4}>
              ${entcWon && entcWon.datas?.[1]} (
              {(
                Number(entcWon && entcWon.datas?.[1]) *
                Number(currency?.USDKRW?.[0])
              )
                .toFixed(0)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              원)
            </StyledPriceTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell align="left">
              <img src={BTC} className="logo" />
              Bitcoin (BTC)
            </StyledTableCell>
            <StyledPriceTableCell align="center" colSpan={2}>
              {Number(
                upBitBTC?.find((a) => a?.market === "KRW-BTC")?.trade_price
              )
                .toFixed(0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </StyledPriceTableCell>
            <StyledPriceTableCell align="center" colSpan={2}>
              $
              {Number(binance?.find((a) => a?.symbol === "BTCUSDT")?.price)
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </StyledPriceTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell align="left">
              <img src={ETH} className="logo" />
              Ethereum (ETH)
            </StyledTableCell>
            <StyledPriceTableCell align="center" colSpan={2}>
              {Number(
                upBitETH?.find((a) => a?.market === "KRW-ETH")?.trade_price
              )
                .toFixed(0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </StyledPriceTableCell>
            <StyledPriceTableCell align="center" colSpan={2}>
              $
              {Number(binance?.find((a) => a?.symbol === "ETHUSDT")?.price)
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </StyledPriceTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell align="left">
              <img src={XRP} className="logo" />
              Ripple (XRP)
            </StyledTableCell>
            <StyledPriceTableCell align="center" colSpan={2}>
              {Number(
                upBitXRP?.find((a) => a?.market === "KRW-XRP")?.trade_price
              )
                .toFixed(0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </StyledPriceTableCell>
            <StyledPriceTableCell align="center" colSpan={2}>
              $
              {Number(binance?.find((a) => a?.symbol === "XRPUSDT")?.price)
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </StyledPriceTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default App;
