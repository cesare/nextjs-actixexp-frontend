import React from 'react'

interface Props {
  onClassnameChange: (value: string) => void,
}

class ServantClassSelector extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
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
      {name: "ruler"},
      {name: "avenger"},
      {name: "mooncancer"},
      {name: "alterego"},
      {name: "foreigner"},
    ]
    return (
      <select onChange={this.handleChange}>
        {selections.map(s => <option value={s.name} key={s.name}>{s.name}</option>)}
      </select>
    )
  }
}

export default ServantClassSelector
