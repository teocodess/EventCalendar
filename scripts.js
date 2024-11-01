const loadData = async () => {
    try {
        const response = await fetch('./data/sportData.json.json');
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const loadedData = await response.json();
        const data = loadedData.data;
        console.log(data)
    }

    catch (error) {
        console.log("Failed to fetch data: ", error)
    }
}

loadData();

