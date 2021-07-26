import React from 'react'

class ServantClassSelector extends React.Component {
  constructor(props: object) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.props.onClassnameChange(event.target.value)
  }
  render() {
    const selections = [
      {name: "saber"},
      {name: "archer"},
      {name: "lancer"},
      {name: "rider"},
      {name: "caster"},
      {name: "assasin"},
      {name: "berserker"},
    ]
    return (
      <select onChange={this.handleChange}>
        {selections.map(s => <option value={s.name} key={s.name}>{s.name}</option>)}
      </select>
    )
  }
}

export default ServantClassSelector
