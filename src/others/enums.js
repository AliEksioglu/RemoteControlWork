const workingtype = {
    'HOLIDAY':  'TATİL',
    'OFFICE': 'OFİSTEN',
    'REMOTE': 'UZAKTAN',
    'REPORT': 'RAPORLU',
    'OFF_DAY': 'İZİNLİ'
}

const dataType = {
    'HOLIDAY': { state: workingtype["HOLIDAY"], color: ' bg-orange-100 px-2' },
    'OFFICE': { state: workingtype["OFFICE"], color: ' bg-green-100 px-2' },
    'REMOTE': { state: workingtype["REMOTE"], color: ' bg-yellow-100 px-2' },
    'REPORT': { state: workingtype["REPORT"], color: ' bg-purple-100 px-2' },
    'OFF_DAY': { state: workingtype["OFF_DAY"], color: ' bg-red-100 px-2' },
}

const buttonValueArray = []
const buttonOptionValue = (array) => {
    for (let data of Object.keys(getDataType())) {
        if (data == "HOLIDAY") continue
        array.push({
            key: data,
            label:
                <button key={data} className="px-2">
                    {workingtype[data]}
                </button>

        })
    }
}

const getButtonOptionValues = () => {
    if (buttonValueArray.length <= 0) {
        buttonOptionValue(buttonValueArray);
    }
    return buttonValueArray;
}

const getDataType = () => dataType;

const getDataTypeState = (key) => {
    return dataType[key.toString()].state
}
const getDataTypeColor = (key) => {
    return dataType[key.toString()].color
}
export {
    getDataTypeState,
    getDataTypeColor,
    getDataType,
    getButtonOptionValues
}