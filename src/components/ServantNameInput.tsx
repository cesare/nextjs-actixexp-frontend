import React from 'react'

interface Props {
  onNameChange: (value: string) => void,
  value?: string,
}

class ServantNameInput extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.onNameChange(event.target.value)
  }

  render() {
    return (
      <input type="text" onChange={this.handleChange} />
    )
  }
}

export default ServantNameInput
