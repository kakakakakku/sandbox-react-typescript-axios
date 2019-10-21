import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [ipRanges, setIpRanges] = useState([
    {
      ip_prefix: '',
      region: '',
      service: '',
    }
  ])

  useEffect(() => {
    const fetchData = async () => {
      const results = await axios('https://ip-ranges.amazonaws.com/ip-ranges.json');
      setIpRanges(results.data.prefixes)
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <ul>
        {
          ipRanges.map(ipRange => (
            <li key={ipRange.ip_prefix + ipRange.service}>{ipRange.ip_prefix}, {ipRange.region}, {ipRange.service}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
