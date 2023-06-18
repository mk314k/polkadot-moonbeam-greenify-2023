import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Input, Button } from "antd";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on the current network
 * @param {*} readContracts contracts from the current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Home({ yourLocalBalance, readContracts }) {
  const [companyScores, setCompanyScores] = useState({});

  const handleScoreChange = (companyAddress, score) => {
    setCompanyScores(prevState => ({
      ...prevState,
      [companyAddress]: score
    }));
  };

  const sendScores = async () => {
    for (const [companyAddress, score] of Object.entries(companyScores)) {
      await readContracts.YourContract.send(companyAddress, score);
    }
  };

  // Example companies data
  const companies = [
    { address: "0x123...", name: "Company 1" },
    { address: "0x456...", name: "Company 2" },
    { address: "0x789...", name: "Company 3" },
    { address: "0xabc...", name: "Company 4" },
    { address: "0xdef...", name: "Company 5" },
  ];

  const columns = [
    {
      title: "Company Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Company Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Score",
      key: "score",
      render: (text, record) => (
        <Input
          onChange={(e) => handleScoreChange(record.address, e.target.value)}
        />
      ),
    },
  ];

  return (
    <div>
      <div style={{ margin: 32 }}>
        <Table dataSource={companies} columns={columns} />
        <Button type="primary" onClick={sendScores}>
          Send Scores
        </Button>
      </div>
    </div>
  );
}

export default Home;
