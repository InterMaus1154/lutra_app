import {ChangeEvent, ChangeEventHandler, FC, useState} from 'react';
import './App.css';

interface IGroup {
    groupName: string;
    groupChildren: IGroupChildren[];
}

interface IGroupChildren {
    groupChildName: string;
}

const DEFAULT_GROUPS: IGroup[] = [
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
            },
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
        groupChildren: [
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
        groupChildren: [
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
    },
    {
        groupName: "I.Aniosztály",
        groupChildren: [
            {
                groupChildName:"CO<sub>3</sub><sup>2-</sup>"
            },
            {
                groupChildName: "S<sup>2-</sup>"
            },
            {
                groupChildName: "SO<sub>3</sub><sup>2-</sup>"
            },
            {
                groupChildName: "S<sub>2</sub>O<sub>3</sub><sup>2-</sup>"
            },
            {
              groupChildName: "OCl<sup>-</sup>"
            }
        ]
    },
    {
        groupName: "II.Aniosztály",
        groupChildren: [
            {
                groupChildName: "B(OH)<sub>4</sub><sup>-</sup>"
            },
            {
                groupChildName: "PO<sub>4</sub><sup>3-</sup>"
            },
            {
                groupChildName: "SO<sub>4</sub><sup>2-</sup>"
            },
            {
                groupChildName: "F<sup>-</sup>"
            },
            {
                groupChildName: "CrO<sub>4</sub><sup>2-</sup>/ Cr<sub>2</sub>O<sub>7</sub><sup>2-</sup>"
            }
        ]
    },
    {
        groupName: "III.Aniosztály",
        groupChildren: [
            {
                groupChildName: "Cl<sup>-</sup>"
            },
            {
                groupChildName: "Br<sup>-</sup>"
            },
            {
                groupChildName: "I<sup>-</sup>"
            },
            {
                groupChildName: "CN<sup>-</sup>"
            },
            {
                groupChildName: "SCN<sup>-</sup>"
            },
        ]
    },
    {
        groupName: "IV.Aniosztály",
        groupChildren: [
            {
                groupChildName: "NO<sub>2</sub><sup>-</sup>"
            },
            {
                groupChildName: "NO<sub>3</sub><sup>-</sup>"
            },
            {
                groupChildName: "H<sub>2</sub>O<sub>2</sub>"
            },
            {
                groupChildName: "<sup>-</sup>OAc"
            }
        ]
    }

];


interface ICheckboxWrapper {
    group: IGroup;
    handleCheckChange: ChangeEventHandler<HTMLInputElement>;
}

const CheckboxWrapper: FC<ICheckboxWrapper> = ({group, handleCheckChange}) => {


    const [isListVisible, setListVisible] = useState<boolean>(false);

    return (
        <div className={"Checkbox-wrapper"}>
            <label htmlFor={group.groupName}>{group.groupName}</label>
            <input type="checkbox" id={group.groupName} value={group.groupName} onChange={handleCheckChange}/>
            <button onClick={() => setListVisible(!isListVisible)}>{ isListVisible ? "Elrejt" : "Mutat"}</button>

            {isListVisible && <ul>
                {
                    group.groupChildren.map(child => <li dangerouslySetInnerHTML={{__html: child.groupChildName}}></li>)
                }
            </ul>
            }
        </div>
    )
};

const App: FC = () => {

    const [selectedNumber, setSelectedNumber] = useState<number>(1);

    const [selectedGroups, setSelectedGroups] = useState<IGroup[]>([]);
    const [randoms, setRandoms] = useState<IGroupChildren[]>([]);

    const generate = (): void => {

        if (selectedGroups.length === 0) {
            alert("Hiba történt");
            return;
        }

        if (selectedNumber < 0) {
            alert("Hiba történt!");
            return;
        }

        let allChildren: IGroupChildren[] = [];
        for (let i = 0; i < selectedGroups.length; i++) {
            for (let j = 0; j < selectedGroups[i].groupChildren.length; j++) {
                allChildren.push(selectedGroups[i].groupChildren[j]);
            }
        }

        if (selectedNumber > allChildren.length) {
            alert("Hiba történt?");
            return;
        }
        const generateNumber = () => {
            return Math.floor(Math.random() * allChildren.length);
        };

        let randomNumbersSet: Set<number> = new Set();
        while (randomNumbersSet.size < selectedNumber) {
            randomNumbersSet.add(generateNumber());
        }

        console.log(allChildren.length);

        let randomNumbers: number[] = Array.from(randomNumbersSet);
        setRandoms([]);
        for (let i = 0; i < selectedNumber; i++) {
            setRandoms(prevState => {
                prevState = [...prevState, allChildren[randomNumbers[i]]];
                return prevState;
            });
        }
    };

    const handleCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedGroups(prevState => {
                prevState = [...prevState, DEFAULT_GROUPS.find(item => item["groupName"] === e.target.value) as IGroup];
                return prevState;
            })
        } else {
            setSelectedGroups(prevState => {
                prevState = prevState.filter(item => item.groupName !== e.target.value);
                return prevState;
            });
        }
    };

    const scaleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        document.body.style.scale = e.target.value;
    }

    return (
        <div className={"App"}>
            <div className="Checkboxes">
                <div className="Header">
                    <h1>Lutra App</h1>
                    <div className={"Scale-selector-wrapper"}>
                        <label htmlFor={"Select-scale"}>Méret:</label>
                        <select onChange={scaleChange}>
                            <option value={1} selected={true}>100%</option>
                            <option value={0.95}>95%</option>
                            <option value={0.9}>90%</option>
                            <option value={0.85}>85%</option>
                            <option value={0.8}>80%</option>
                            <option value={0.75}>75%</option>
                        </select>
                    </div>

                </div>

                {
                    DEFAULT_GROUPS.map(group => (
                        <CheckboxWrapper group={group} handleCheckChange={handleCheckChange}/>
                    ))
                }
            </div>
            <div className={"Number-selector-wrapper"}>
                <input type="number" value={selectedNumber} onChange={e => setSelectedNumber(parseInt(e.target.value))}
                       min={1}/>
                <button onClick={generate}>Csináld!</button>
            </div>

            {/*{*/}
            {/*    randoms.length > 0 && <h1>Ezt tessék tanulni:</h1>*/}
            {/*}*/}
            <ol>
                {
                    randoms.map(random => <li dangerouslySetInnerHTML={{__html: random.groupChildName}}></li>)
                }
            </ol>

        </div>
    );
}


export default App;
