import React, { useState } from 'react';
import './ClassSelection.scss';
import ClassProgress from '../ClassProgress/ClassProgress';
import QuestList from '../QuestList/QuestList';
import BadgeBox from '../BadgeBox/BadgeBox';
import axios from "axios";
const { checkLocked, filterLocked } = require('../../helpers/badgeHelpers');

export default function ClassSelection(props) {
  const [ classItem, setClassItem ] = useState(null);
  const [ classProgress, setClassProgress ] = useState(null);

  const changeClass = name => {
    if (name === 'Choose a class') {
      return;
    }
    const selectedClass = props.state.classesData.find(classData => classData.name === name);
    const selectedClassProgress = props.state.classesProgressData.find(classProgress => selectedClass.id === classProgress.class_id)
    setClassItem(selectedClass);
    setClassProgress(selectedClassProgress);
  };

  const lockedBadges = props.state.classBadges && checkLocked(props.state.classBadges, props.state.userBadges);
  const unlockedForClass = lockedBadges && filterLocked(lockedBadges, props.state.classBadges);



  const acceptQuest = function (questId) {
    axios.post(`/quests/${questId}/acceptQuest`).then(() => {
      const quests = props.state.userQuests.map(quest => {
        if (quest.id === questId) {
          quest.adventurer_id = props.state.userData.id;
        }
        return quest;
      })

      props.setState(prevState => ({
        ...prevState,
        userQuests: quests
      }))
    });
  }


  const classList = props.state.classesData && props.state.classesData.map((classData, index) => {
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
              <img alt="avatar" src={classItem.avatar} />
              <span>
                <h3>{classItem.name}</h3>
                <p>{classItem.description}</p>
              </span>
            </div>
            <div className="class-badges">
              <h3>Badges:</h3>
              <BadgeBox badges={unlockedForClass} lockedBadges={lockedBadges} />
            </div>
            <h3>Class Progress:</h3>
            {classProgress && <ClassProgress data={classProgress} />}
          </div>
        }
      </section>
      {classItem &&
        <QuestList
        classItem={classItem}
        userQuests={props.state.userQuests}
        villagers={props.state.villagers}
        userData={props.state.userData}
        onAccept={acceptQuest}
        // knownUsers={props.state.knownUsers}
        // chatMessages={props.state.chatMessages}
        // socket={props.state.socket}
        // newUserCheck={props.newUserCheck}
        // openNewSocket={props.openNewSocket}
        // addNewMessage={props.addNewMessage}
        />}
    </section>
  );
}