/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import CheckBox from 'react-native-check-box';
import Colors, { userTypeColor } from '../../src/constants/colors';
import { getUserDetails } from '../../src/actions';
import { filterByUserType } from '../../src/utils/array';
import { filterOptions } from '../../src/constants/metrics';

const Container = styled.View`
  display: flex;
  flex: 1;
`;

const ListCard = styled.View`
  display: flex;
  flex-direction: row;
  height: 150px;
  width: 95%;
  padding: 10px;
  margin: 10px;
  background: ${Colors.lightGrey};
`;


const HorizontalLine = styled.View`
  height: 100%;
  width: 20px;
  background: ${props => props.userColor};
`;

const DetailsContainer = styled.View`
  margin-left: 30px;
  width: 100%;
`;

const CircularView = styled.View`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background: ${Colors.bright};
  justify-content: center;
  align-items: center;
  display: flex;
  margin-bottom: 10px;
`;

const CircularContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
  margin-top: 25px;
`;

const Header = styled.View`
  display: flex;
  height: 50px;
  background: ${Colors.lightGrey};
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  margin-top: 30px;
`;

const Filters = styled.View`
  display: flex;
  flex-direction: row;
  height: 50px;
  justify-content: center;
  padding: 10px;
  margin-bottom: 10px;
  justify-content: space-between;
`;

class LoginScreen extends Component {
  displayName = 'LoginScreen';

  constructor() {
    super();
    this.state = {
      userData: [],
      checkValues: [],
    };
  }

  componentDidMount() {
    this.props.getUserDetails();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.usersList !== this.props.usersList) {
      this.setState({
        userData: nextProps.usersList,
      });
    }
  }

  filterUser = (text) => {
    const { checkValues } = this.state;
    const newCheckValues = [...checkValues];
    const valueIndex = newCheckValues.indexOf(text);
    if (valueIndex !== -1) {
      newCheckValues.splice(valueIndex, 1);
    } else {
      newCheckValues.push(text);
    }
    // console.log('the users left are',filterByUserType(this.props.usersList, text), typeof text)
    this.setState({
      userData: newCheckValues.length ? filterByUserType(this.props.usersList, newCheckValues) : this.props.usersList,
      checkValues: newCheckValues,
      currentlyChecked: text,
    });
  }

  keyExtractor = ({ id }, index) => id || index;

  renderRow = ({ item }) => (<ListCard>
    <HorizontalLine userColor={userTypeColor[item.type]} />
    <DetailsContainer>
      <View>
        <Text>
          {item.fullName}
        </Text>
        <Text>
          {item.email}
        </Text>
      </View>
      <CircularContainer>
        <View>
          <CircularView>
            <Text>1</Text>
          </CircularView>
          <Text>{item.wallet1}</Text>
        </View>
        <View>
          <CircularView>
            <Text>2</Text>
          </CircularView>
          <Text>{item.wallet2}</Text>
        </View>
        <View>
          <CircularView>
            <Text>3</Text>
          </CircularView>
          <Text>{item.wallet3}</Text>
        </View>
      </CircularContainer>
    </DetailsContainer>
  </ListCard>);

  render() {
    const { error, loading } = this.props;
    const { checkValues } = this.state;
    if (error) {
      return (
        <Text>
          Something went wrong!
        </Text>
      );
    }
    else if (loading) {
      return (
        <Text>
          Loading...
        </Text>
      );
    }
    return (
      <Container>
        <View style={{ width: '100%' }}>
          <Header>
            <Text>CBOX USERS</Text>
          </Header>
          <ScrollView horizontal>
            <Filters>
              {filterOptions.map((ele, i) => (
                <CheckBox
                  checkBoxColor='#00a465'
                  checkedCheckBoxColor='#00a465'
                  style={{ marginRight: 10, flex: 1 }}
                  onClick={() => this.filterUser(ele.value)}
                  isChecked={checkValues.includes(ele.value)}
                  rightText={ele.displayName}
                  rightTextStyle={{ color: 'black' }}
                />
            ))}
            </Filters>
          </ScrollView>
          <FlatList
            style={{ marginBottom: 150 }}
            data={this.state.userData}
            renderItem={this.renderRow}
            keyExtractor={this.keyExtractor}
            initialNumToRender={10}
          />
        </View>
      </Container>);
  }
}

LoginScreen.propTypes = {
  getUserDetails: PropTypes.func.isRequired,
  usersList: PropTypes.arrayOf(PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
    wallet1: PropTypes.number.isRequired,
    wallet2: PropTypes.number.isRequired,
    wallet3: PropTypes.number.isRequired,
  })).isRequired,
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ users }) => ({
  usersList: users.data,
  error: users.error,
  loading: users.loading,
});

const mapDispatchToProps = {
  getUserDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
