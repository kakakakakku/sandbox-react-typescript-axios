import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IpRangeState = {
  ip_prefix: '',
  region: '',
  service: '',
}

const App: React.FC = () => {
  const [ipRanges, setIpRanges] = useState([IpRangeState])
  const [filterdIpRanges, setFilterdIpRanges] = useState([IpRangeState])

  const [formIpPrefix, setFormIpPrefix] = useState('')
  const [formRegion, setFormRegion] = useState('')
  const [formService, setFormService] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const results = await axios('https://ip-ranges.amazonaws.com/ip-ranges.json');
      setIpRanges(results.data.prefixes)
      setFilterdIpRanges(results.data.prefixes)
    };
    fetchData();
  }, []);

  useEffect(() => {
    filter()
  }, [formIpPrefix, formRegion, formService]);

  const filter = () => {
    setFilterdIpRanges(ipRanges
      .filter(ipRange =>
        ipRange.ip_prefix.indexOf(formIpPrefix) !== -1 &&
        ipRange.region.indexOf(formRegion) !== -1 &&
        ipRange.service.indexOf(formService) !== -1
      )
    )
  };

  return (
    <div className="App">
      <form>
        Prefix : <input type="text" name="ip_prefix" onChange={e => setFormIpPrefix(e.target.value)}></input><br />
        Region : <input type="text" name="region" onChange={e => setFormRegion(e.target.value)}></input><br />
        Service : <input type="text" name="service" onChange={e => setFormService(e.target.value)}></input><br />
      </form>
      <hr />
      Total : {filterdIpRanges.length} 件
      <hr />
      <ul>
        {
          filterdIpRanges.map(ipRange => (
            <li key={ipRange.ip_prefix + ipRange.service}>{ipRange.ip_prefix}, {ipRange.region}, {ipRange.service}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
