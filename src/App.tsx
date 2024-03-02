import {ChangeEvent, FC, useState} from 'react';
import './App.css';




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
      groupName: "I.Kationosztály",
      groupChildren: [
        {
          groupChildName: "Ag<sup>+</sup>"
        },
        {
          groupChildName: "Pb<sup>2+</sup>"
        },
        {
          groupChildName: "Hg<sup>2+</sup>"
        } ,
        {
          groupChildName: "Cu<sup>2+</sup>"
        },
        {
          groupChildName: "Cd<sup>2+</sup>"
        },
        {
          groupChildName: "Bi<sup>3+</sup>"
        }
      ]
    },
    {
      groupName: "II.Kationosztály",
      groupChildren: [
        {
          groupChildName: "AsO<sub>3</sub><sup>3-</sup>/As<sup>3+</sup>"
        },
      ]
    },
    {
      groupName: "III.Kationosztály",
      groupChildren: [
        {
          groupChildName: "Ni<sup>2+</sup>"
        },
        {
          groupChildName: "Co<sup>2+</sup>"
        },
        {
          groupChildName: "Fe<sup>2+</sup>"
        },
        {
          groupChildName: "Fe<sup>3+</sup>"
        },
        {
          groupChildName: "Mn<sup>2+</sup>"
        },
        {
          groupChildName: "Cr<sup>3+</sup>"
        },
        {
          groupChildName: "Zn<sup>2+</sup>"
        },
        {
          groupChildName: "Al<sup>3+</sup>"
        }
      ]
    },
    {
      groupName: "IV.Kationosztály",
      groupChildren:[
        {
          groupChildName: "Ca<sup>2+</sup>"
        },
        {
          groupChildName: "Ba<sup>2+</sup>"
        }
      ]
    },
    {
      groupName: "V.Kationosztály",
      groupChildren:[
        {
          groupChildName: "Na<sup>+</sup>"
        },
        {
          groupChildName: "K<sup>+</sup>"
        },
        {
          groupChildName: "NH<sub>4</sub><sup>+</sup>"
        },
        {
          groupChildName: "Mg<sup>2+</sup>"
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
                    group.groupChildren.map(child => <li dangerouslySetInnerHTML={{__html: child.groupChildName}}></li>)
                  }
                </ul>
              </div>
          ))
        }
      </div>
      <input type="number" value={selectedNumber} onChange={e => setSelectedNumber(parseInt(e.target.value))} min={1}/>
      <button onClick={generate}>Csináld!</button>
      {
          randoms.length > 0 && <h1>Ezt tessék tanulni:</h1>
      }
      {
        randoms.map(random => <p dangerouslySetInnerHTML={{__html: random.groupChildName}}></p>)
      }

    </div>
  );
}



export default App;
