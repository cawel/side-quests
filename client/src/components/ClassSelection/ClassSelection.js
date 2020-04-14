import React, { useState } from 'react';
import './ClassSelection.scss';
import ClassProgress from '../ClassProgress/ClassProgress';
import QuestList from '../QuestList/QuestList';


export default function ClassSelection(props) {
  const [ classItem, setClassItem ] = useState(null);
  const [ classProgress, setClassProgress ] = useState(null);
  const { classesData, classesProgressData } = props;

  const changeClass = name => {
    if (name === 'Choose a class') {
      return;
    }
    const selectedClass = classesData.find(classData => classData.name === name);
    const selectedClassProgress = classesProgressData.find(classProgress => selectedClass.id === classProgress.id)
    setClassItem(selectedClass);
    setClassProgress(selectedClassProgress);
  };

  const classList = classesData.map((classData, index) => {
    const { name } = classData;
    return (
      <option 
        key={index}
        value={name}
      >
        {name}
      </option>
    );
  })
  return (
    <section className="quest-selection">
      <section className="select-class">
        <h2> Select a class </h2>
        <div className="menu">
          <select 
            id="classes" 
            className="browser-default custom-select"
            onChange={e => changeClass(e.currentTarget.value)}
          >
            <option defaultValue>Choose a class</option>
            {classList}
          </select>
        </div>
          {classItem && 
            <div>
              <div className="content">
                <img src={classItem.avatar}/>
                <span>
                  <h3>{classItem.name}</h3>
                  <p>{classItem.description}</p>
                </span>
              </div>
              <h3>Class Progress:</h3>
              <ClassProgress data={classProgress}/>
            </div>
          }
      </section>
      { classItem && <QuestList classItem={classItem} questData={props.questData}/> }
    </section>
  );
}