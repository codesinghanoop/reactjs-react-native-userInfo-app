import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Colors, { userTypeColor } from '../../src/constants/colors';
import { getUserDetails } from '../../src/actions';
import Metrics from '../../src/constants/metrics';
import { filterByUserType } from '../../src/utils/array';


const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  height: 100vh;
`;

const Border = styled.div`
  border-style: solid;
  border-color: ${Colors.lightGrey};
  padding: 2%;
`;

const ListCard = styled.div`
  display: flex;
  justifyContent: flex-start;
  height: 150px;
  width: 90%;
  padding: 10px;
  margin-bottom: 10px;
  background: ${Colors.lightGrey};
  @media (max-width: ${Metrics.large}) {
    width: 97%;
  }
  @media (max-width: ${Metrics.small}) {
    width: 94%;
  }
  @media (min-width: ${Metrics.Xlarge}) {
    width: 98%
  }
`;


const HorizontalLine = styled.div`
  height: 100%;
  width: 20px;
  background: ${props => props.userColor};
`;

const DetailsContainer = styled.div`
  margin-left: 30px;
  width: 100%;
`;

const CircularView = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background: ${Colors.bright};
  justify-content: center;
  align-items: center;
  display: flex;
  margin-bottom: 10px;
`;

const CircularContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  height: 25px;
  background: ${Colors.lightGrey};
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  @media (max-width: ${Metrics.large}) {
    width: 97%;
  }
  @media (max-width: ${Metrics.small}) {
    width: 94%;
  }
  @media (min-width: ${Metrics.Xlarge}) {
    width: 98%
  }
`;

const Filters = styled.div`
  display: flex;
  height: 25px;
  justify-content: center;
  padding: 10px;
  margin-bottom: 10px;
  justify-content: space-between;
  @media (max-width: ${Metrics.large}) {
    width: 97%;
  }
  @media (max-width: ${Metrics.small}) {
    width: 94%;
  }
  @media (min-width: ${Metrics.Xlarge}) {
    width: 98%
  }
`;

class Home extends React.Component {
  constructor(props) {
    super(props);
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
  filterUser = (e) => {
    const { checkValues } = this.state
    const newCheckValues = [...checkValues];
    const valueIndex = newCheckValues.indexOf(e.target.value);
    if (valueIndex !== -1) {
      newCheckValues.splice(valueIndex, 1);
    } else {
      newCheckValues.push(e.target.value);
    }
    // console.log('the users left are',filterByUserType(this.props.usersList, e.target.value), typeof e.target.value)
    this.setState({
      userData: newCheckValues.length ? filterByUserType(this.props.usersList, newCheckValues) : this.props.usersList,
      checkValues: newCheckValues
    });
  }
  render() {
    console.log('the list is====>',this.props.usersList)
    const { error, loading } = this.props;
    if (error) {
      return (
        <div>
          Something went wrong!
        </div>
      );
    }
    else if (loading) {
      return (
        <div>
          Loading...
        </div>
      );
    }
    return (
      <Container>
        <div style={{ width: '100%' }}>
          <Header>
            <p>CBOX USERS</p>
          </Header>
          <Filters>
            <div>
              <input id='group0' value={0} type='checkbox' onChange={this.filterUser} />
              <label for='group0'>Type 0</label>
            </div>
            <div>
              <input id='group1' value={1} type='checkbox' onChange={this.filterUser} />
              <label for='group1'>Type 1</label>
            </div>
            <div>
              <input id='group2' value={2} type='checkbox' onChange={this.filterUser} />
              <label for='group2'>Type 2</label>
            </div>
            <div>
              <input id='group3' value={3} type='checkbox' onChange={this.filterUser} />
              <label for='group3'>Type 3</label>
            </div>
            <div>
              <input id='group4' value={4} type='checkbox' onChange={this.filterUser} />
              <label for='group4'>Type 4</label>
            </div>
          </Filters>
          {this.state.userData.map(ele =>
            (<ListCard>
              <HorizontalLine userColor={userTypeColor[ele.type]} />
              <DetailsContainer>
                <div>
                  <p>
                    {ele.fullName}
                  </p>
                  <p>
                    {ele.email}
                  </p>
                </div>
                <CircularContainer>
                  <div>
                    <CircularView>
                      <p>1</p>
                    </CircularView>
                    <span>{ele.wallet1}</span>
                  </div>
                  <div>
                    <CircularView>
                      <p>2</p>
                    </CircularView>
                    <span>{ele.wallet2}</span>
                  </div>
                  <div>
                    <CircularView>
                      <p>3</p>
                    </CircularView>
                    <span>{ele.wallet3}</span>
                  </div>
                </CircularContainer>
              </DetailsContainer>
            </ListCard>)
          )}
        </div>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  getUserDetails,
};

const mapStateToProps = ({ users }) => ({
  usersList: users.data,
  error: users.error,
  loading: users.loading,
});

Home.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
