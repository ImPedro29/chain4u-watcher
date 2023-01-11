import {Container, IsSync, Title} from "./styles";
import {useEffect, useState} from "react";

export default function Node({url, title, officialData}) {
    const [data, setData] = useState({});

    let interval;
    useEffect(() => {
        if (!url) return;
        fetch(url+"/node/overview").then(r => r.json()).then(({data}) => setData(data?.overview)).catch(console.log)

        clearInterval(interval)
        interval = setInterval(() => {
            fetch(url+"/node/overview").then(r => r.json()).then(({data}) => setData(data?.overview)).catch(console.log)
        }, 5000);
    }, [url])

    useEffect(() => {
        console.log(data,officialData)
    }, [data, officialData])

    const isSync = data?.nonce > officialData?.nonce - 2

    return (
        <Container>
            <Title>{title}</Title>
            <IsSync isSync={isSync}>{isSync ? "Is sync!" : "Isn't sync!"}</IsSync>
            <p>Last block: {data.nonce}</p>
        </Container>
    )
}
