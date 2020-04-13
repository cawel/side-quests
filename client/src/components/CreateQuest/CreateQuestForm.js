import React from 'react';
import './CreateQuestForm.scss';
import Button from '../Button/Button';

export default function CreateQuestForm(props) {

  return (
    <main className="create-quest__card">
      <h3>Create Quest</h3>
      <form onSubmit={event => event.preventDefault()} autoComplete="off">
        <select className="browser-default custom-select">
          <option selected>Type of Quest</option>
          <option value="1">Errand</option>
          <option value="2">Entertainment</option>
          <option value="3">Workout</option>
          <option value="4">Lesson</option>
          <option value="5">Food</option>
          <option value="6">Technical assistance</option>
        </select>
        <input
          name="title"
          type="text"
          placeholder={"Name your quest"}
          value={props.name}
          data-testid="name-input"
        />
        <input
          name="description"
          type="text"
          placeholder={"Describe your quest"}
          value={props.description}
          data-testid="description-input"
        />
        <input
          name="address"
          type="text"
          placeholder={"(OPTIONAL) Enter address"}
          value={props.address}
          data-testid="address-input"
        />
      </form>
      <section className="register__actions">
        <Button confirm>Confirm</Button>
        <Button danger>Cancel</Button>
      </section>
    </main>
  )
}