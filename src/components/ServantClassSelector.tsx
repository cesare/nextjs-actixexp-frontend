import React from 'react'

interface Props {
  onClassnameChange: (value: string) => void,
  value?: string,
}

interface ServantSelection {
  name: string,
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
    const selections = this.servantSelections()

    return (
      <select value={this.props.value} onChange={this.handleChange}>
        <option value="" />
        {selections.map(s => <option value={s.name} key={s.name}>{s.name}</option>)}
      </select>
    )
  }

  private servantSelections(): ServantSelection[] {
    return [
      {name: "saber"},
      {name: "archer"},
      {name: "lancer"},
      {name: "rider"},
      {name: "caster"},
      {name: "assassin"},
      {name: "berserker"},
      {name: "ruler"},
      {name: "avenger"},
      {name: "mooncancer"},
      {name: "alterego"},
      {name: "foreigner"},
      {name: "pretender"},
    ]
  }
}

export default ServantClassSelector
