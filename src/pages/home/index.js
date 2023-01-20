import {Container} from "./styles";
import Node from "../../components/node";
import {useEffect, useState} from "react";

function Index() {
    const [data, setData] = useState({});
    let interval;
    useEffect(() => {
        fetch("https://node.mainnet.klever.finance/node/overview").then(r => r.json()).then(({data}) => setData(data?.overview)).catch(console.log)
        clearInterval(interval)
        interval = setInterval(() => {
            fetch("https://node.mainnet.klever.finance/node/overview").then(r => r.json()).then(({data}) => setData(data?.overview)).catch(console.log)
        }, 5000);
    }, [])

    return (
        <Container>
            <Node title={'Chain4u 1'} url={"/api/node1"} officialData={data}/>
            <Node title={'Chain4u 2'} url={"/api/node2"} officialData={data}/>

        </Container>
    );
}

export default Index;
