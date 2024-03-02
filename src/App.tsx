import {ChangeEvent, FC, useState} from 'react';
import './App.css';


const Select : FC = () =>{
  return(
    <select>

    </select>
  );
};




const App : FC = () =>{

  const [groups, setGroups] = useState<IGroup[]>([]);

  const [selectedNumber, setSelectedNumber] = useState<number>(1);

  interface IGroup{
    groupName: string;
    groupChildren: IGroupChildren[];
  }

  interface IGroupChildren{
    groupChildName: string;
  }

  const DEFAULT_GROUPS : IGroup[] = [
    {
      groupName: "A",
      groupChildren: [
        {
          groupChildName: "A1"
        },
        {
          groupChildName: "A2"
        },
        {
          groupChildName: "A3"
        }
      ]
    },
    {
      groupName: "B",
      groupChildren: [
        {
          groupChildName: "B1"
        },
        {
          groupChildName: "B2"
        },
        {
          groupChildName: "B3"
        }
      ]
    },
    {
      groupName: "C",
      groupChildren: [
        {
          groupChildName: "C1"
        },
        {
          groupChildName: "C2"
        },
        {
          groupChildName: "C3"
        },
        {
          groupChildName: "C4"
        }
      ]
    }

  ];
  const [selectedGroups, setSelectedGroups] = useState<IGroup[]>([]);
  const [randoms, setRandoms] = useState<IGroupChildren[]>([]);

  const generate = () : void =>{

    if(selectedGroups.length === 0){
      alert("A semmiből max semmit tudok neked adni: "+null);
      return;
    }

    if(selectedNumber < 0){
      alert("Hát oké");
      return;
    }

    let allChildren : IGroupChildren[] = [];
    for(let i =0;i<selectedGroups.length;i++){
      for(let j=0;j<selectedGroups[i].groupChildren.length;j++){
        allChildren.push(selectedGroups[i].groupChildren[j]);
      }
    }

    if(selectedNumber > allChildren.length){
      alert("Nincs elég kation anion vagy akármi ennyi számhoz de diiikkk ki akarod crasheltetni a programomat");
      return;
    }
    const generateNumber = () =>{
      const min = 1;
      return Math.floor(Math.random() * allChildren.length);
    };

    let randomNumbersSet : Set<number> = new Set();
    while(randomNumbersSet.size < selectedNumber){
      randomNumbersSet.add(generateNumber());
    }

    console.log(allChildren.length);

    let randomNumbers : number[] = Array.from(randomNumbersSet);
    setRandoms([]);
    for(let i=0;i<selectedNumber;i++){
      setRandoms(prevState => {
        prevState = [...prevState, allChildren[randomNumbers[i]]];
        return prevState;
      });
    }
  };

  const handleCheckChange = (e :ChangeEvent<HTMLInputElement>) =>{
    if(e.target.checked){
      setSelectedGroups(prevState => {
        prevState = [...prevState, DEFAULT_GROUPS.find(item => item["groupName"] === e.target.value) as IGroup];
        return prevState;
      })
    }else{
      setSelectedGroups(prevState => {
        prevState = prevState.filter(item => item.groupName !== e.target.value);
        return prevState;
      });
    }
  };

  return(
    <div className={"App"}>
      <div className="Checkboxes">
        <h1>Csoportok:</h1>
        {
          DEFAULT_GROUPS.map(group =>(
              <div className={"Checkbox-wrapper"}>
                <label htmlFor={group.groupName}>{group.groupName}</label>
                <input type="checkbox" id={group.groupName} value={group.groupName} onChange={handleCheckChange}/>
                <ul>
                  {
                    group.groupChildren.map(child => <li>{child.groupChildName}</li>)
                  }
                </ul>
              </div>
          ))
        }
      </div>
      <input type="number" value={selectedNumber} onChange={e => setSelectedNumber(parseInt(e.target.value))} min={1}/>
      <button onClick={generate}>Generate</button>
      {
          randoms.length > 0 && <h1>Ezt tessék tanulni:</h1>
      }
      {
        randoms.map(random => <p>{random.groupChildName}</p>)
      }

    </div>
  );
}



export default App;
