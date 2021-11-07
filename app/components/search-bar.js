import * as React from 'react';
import { SearchBar } from 'react-native-elements';

export default class SearchEngine extends React.Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <SearchBar
        placeholder="Search for places..."
        onChangeText={this.updateSearch}
        value={search}
        lightTheme='true'
        containerStyle={{
          backgroundColor: 'gainsboro',
          borderRadius: 32,
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '90%'
        }}
        inputContainerStyle={{
          borderRadius: 64,
          backgroundColor: 'none',
        }}
        inputStyle={{
          fontSize: 16,
          color: 'black'
        }}
        searchIcon={{
          color: 'black'
        }}
        clearIcon={{
          color: 'black'
        }}
        cancelButtonTitle={{
          color: 'black'
        }}
        placeholderTextColor='gray'
      />
    );
  }
}
