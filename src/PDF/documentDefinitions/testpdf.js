var docDefinition = (data) => {
    console.log("Inserting data to PDF", data);
    return (
        {
            content: [
                {
                    layout: 'lightHorizontalLines', // optional
                    table: {
                        // headers are automatically repeated if the table spans over multiple pages
                        // you can declare how many rows should be treated as headers
                        headerRows: 1,
                        widths: ['*', 'auto', 100, '*'],
                        
                        body: [
                            [data.heading[0], data.heading[1], data.heading[2], data.heading[3]],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
                            [{ text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4']
                        ]
                    }
                },
                {image: data.imageTest, width: 150}
            ]
        })
};


export default docDefinition;