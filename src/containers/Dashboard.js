import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import { getCompanies } from '../actions/company-action'
import './Dashboard.css'
import Loader from "./App/Loader";
import { Input,AutoComplete,Table, Tag,Spin } from 'antd';
import {
    PieChart, Pie, Sector, Cell,  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer

} from 'recharts';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const columns = [
    {
        title: 'Name',
        dataIndex: 'companyName',
        key: 'companyName',
        render: text => <a>{text}</a>,
        // sorter: (a, b) => a.companyName.length - b.companyName.length,
        // sortDirections: ['descend', 'ascend'],
        defaultSortOrder:'descend'
    },
    {
        title: 'Hiring Status',
        dataIndex: 'hiringStatus',
        key: 'hiringStatus',
        render: hiringStatus => (
                <Tag color={hiringStatus==='Hiring'?'green':(hiringStatus==='Hiring Freeze'?'geekblue':'volcano')} >
                    {hiringStatus.toUpperCase()}
                </Tag>
        )
    },
    {
        title: 'Salary Cuts',
        dataIndex: 'salaryCut',
        key: 'salaryCut',
        render: salaryCut => (
            <Tag color={salaryCut==='Yes'?'volcano':'green'} >
                {salaryCut.toUpperCase()}
            </Tag>
        )
    },
    {
        title: 'Location',
        dataIndex: 'city',
        key: 'city',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Sector',
        dataIndex: 'industry',
        key: 'industry',
        render: text => <a>{text}</a>,
    }
];


class Docs extends Component {

    constructor(props){
        super(props);
        this.state ={
            searchResultLoading:false,
            searchResults:[]
        }
    }
    componentDidMount() {
        this.props.getCompanies();
    }

    getHiringStatusSplit(companies){
        let hiring = 0;
        let hiringFreeze = 0;
        let layoffs = 0;
        for(let i=0; i<companies.length; i++){
            if(companies[i].hiringStatus=='Hiring'){
                hiring++;
            }
            if(companies[i].hiringStatus=='Hiring Freeze'){
                hiringFreeze++;
            }
            if(companies[i].hiringStatus=='Layoffs'){
                layoffs++;
            }
        }
        let data = [];
        data.push({ name: 'Hiring', value: hiring })
        data.push({ name: 'Hiring Freeze', value: hiringFreeze })
        data.push({ name: 'Laying Off', value: layoffs })
        return data;
    }

    getSectorCompanies(companies){
        let comp = new Object();
        for(let i=0; i<companies.length; i++){
            if(comp.hasOwnProperty(companies[i].industry)){
                let temp = comp[companies[i].industry];
                temp.total++;
                if(companies[i].hiringStatus==='Hiring'){
                    temp.hirings++;
                }
                if(companies[i].hiringStatus==='Layoffs'){
                    temp.layoffs++;
                }
                comp[companies[i].industry] = temp;
            }
            else{
                let temp = {total:0, hirings:0,layoffs:0};
                temp.total++;
                temp.name = companies[i].industry;
                if(companies[i].hiringStatus==='Hiring'){
                    temp.hirings++;
                }
                if(companies[i].hiringStatus==='Layoffs'){
                    temp.layoffs++;
                }
                comp[companies[i].industry] = temp;
            }
        }
        let result = [];
        Object.keys(comp).forEach(function(key) {
            if(comp[key].hirings>0)
            result.push(comp[key])
        });
        return result;
    }

    renderItem (title,count){
        return {
            value: title,
            label: (
                <div style={{display: 'flex', justifyContent: 'space-between',}}>
                    {title}
                    <span>
                        {count}
                    </span>
                </div>
            ),
        };
    };

    getSearchOptions(companies){
        let companyObj = new Object();
        let locationObj = new Object();
        let industryObj = new Object();
        for(let i=0; i<companies.length; i++){
            if(companyObj.hasOwnProperty(companies[i].companyName)){
                let cname = companies[i].companyName;
                companyObj[cname]++;
            }else{
                let cname = companies[i].companyName;
                companyObj[cname] = 1;
            }

            if(locationObj.hasOwnProperty(companies[i].city)){
                let city = companies[i].city;
                locationObj[city]++;
            }else{
                let city = companies[i].city;
                locationObj[city] = 1;
            }

            if(industryObj.hasOwnProperty(companies[i].industry)){
                let industry = companies[i].industry;
                industryObj[industry]++;
            }else{
                let industry = companies[i].industry;
                industryObj[industry] = 1;
            }
        }
        let locationOptions = [];
        let allLocations = Object.keys(locationObj);
        for(let i=0; i<allLocations.length; i++){
            locationOptions.push(this.renderItem(allLocations[i], locationObj[allLocations[i]]))
        }

        let companiesOptions = [];
        let allCompanies = Object.keys(companyObj);
        for(let i=0; i<allCompanies.length; i++){
            companiesOptions.push(this.renderItem(allCompanies[i], companyObj[allCompanies[i]]))
        }

        let sectorOptions = [];
        let allSectors = Object.keys(industryObj);
        for(let i=0; i<allSectors.length; i++){
            sectorOptions.push(this.renderItem(allSectors[i], industryObj[allSectors[i]]))
        }
        const options = [
            {
                label: 'Locations',
                options: locationOptions
            },
            {
                label: 'Sectors',
                options: sectorOptions
            },
            {
                label: 'Companies',
                options: companiesOptions
            },
        ];
        console.log(options)
        return options
    }

    getSearchResults(value, companies){
        this.setState({searchResultLoading:true,searchInput:"", searchResults:[]})
        setTimeout(() => {
            let result = []
            for(let i=0; i<companies.length; i++){
                if(companies[i].companyName.toUpperCase()===value.toUpperCase() || companies[i].city.toUpperCase()===value.toUpperCase()
                    || companies[i].industry.toUpperCase()===value.toUpperCase()){
                    result.push(companies[i])
                }
            }
            this.setState({searchResultLoading:false,searchInput:value, searchResults:result})
        }, 2000);


    }

    render() {
        let { companies } = this.props;
        return (
            <div>
                <div className="navigation">
                    <div className={"container"}>
                        <div className="navigationLeft">
                            <Link to={"/"}> <div className="navigationLogo">
                                Covid-19 Job Tracker
                            </div>
                            </Link>
                        </div>
                        <div className="navigationRight">
                            <div className={"contributeButton"}>
                                <Link to={"contribute"}>Contribute to the tracker</Link>
                            </div>
                        </div>
                    </div>
                </div>
                {companies.loading && <Loader/>}
                {!companies.loading && <div className="container" style={{marginTop:'5rem'}}>
                    <div className={"header"}>
                        <div className={"liveTag"}>LIVE</div>
                        <div className={"headerText"}>Is your career at risk?</div>
                    </div>
                    <div className={"totalCompanies"}>We are tracking {companies.companies.length} companies worldwide for hirings, salary cuts and layoffs.</div>
                    <div className={"companySearch"}>
                        <label>Search with your location, industry or company name</label>

                        <AutoComplete
                            dropdownClassName="certain-category-search-dropdown"
                            dropdownMatchSelectWidth={800}
                            style={{ width: 800 }}
                            options={this.getSearchOptions(companies.companies)}
                            filterOption={(inputValue, option) =>  {
                                if(option.hasOwnProperty("value")){
                                     return option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                            }}

                        >
                            <Input.Search
                                placeholder="search here.."
                                enterButton="Search"
                                size="large"
                                onSearch={value => this.getSearchResults(value, companies.companies)}
                            />
                        </AutoComplete>
                        <div className={"disclaimer"}>All data shown on our platform is collected from <a href={"https://www.forbes.com/"} target={"blank"}>Forbes</a> ,<a href={"https://www.businessinsider.com/"} target={"blank"}>Business Insider</a> and commmunity resources.</div>

                    </div>
                    {this.state.searchResultLoading &&
                    <div style={{textAlign:'center'}}>
                        <Spin tip="Loading search resuults..."></Spin>
                        <br/><br/>
                    </div>
                    }
                    {this.state.searchResults.length>0 &&
                    <div>
                        <div className={"statsSection"}>
                            <div className={"tableHeader"}>Search results for : {this.state.searchInput}</div>
                            {this.state.searchResults.length>0 && <Table columns={columns} dataSource={this.state.searchResults} tableLayout={"fixed"} size={"middle"}/>}
                        </div>
                        <br/><br/>
                    </div>
                    }
                    <div className={"statsSection"}>
                        <div className={"tableHeader"}>Top companies currently hiring</div>
                        {companies.companies.length>0 && <Table columns={columns} dataSource={companies.hirings} tableLayout={"fixed"} size={"middle"}/>}
                    </div>
                    <div className={"statsSection scroll"}>
                        <div className={"tableHeader"}>Top companies currently laying off</div>
                        {companies.companies.length>0 && <Table columns={columns} dataSource={companies.layoffs} />}
                    </div>
                    <div className={"row graphSection"}>
                        <div className={"col-md-1"}>
                            {/*blank section*/}
                        </div>
                        <div className={"col-md-5"} ref={"pieDiv"}>
                            <div className={"graph"}>
                                <div className={"graphHead"}>Overall Hiring Status</div>
                                <div  style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
                                    <Pie
                                        data={this.getHiringStatusSplit(companies.companies)}
                                        // cx={200}
                                        // cy={120}
                                        innerRadius={30}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                        label
                                    >
                                        {
                                            this.getHiringStatusSplit(companies.companies).map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                        }
                                    </Pie>
                                    <Legend verticalAlign="bottom" height={36} align={"left"}/>
                                </PieChart>
                                </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                        <div className={"col-md-5"} ref={"pieDiv"}>
                            <div className={"graph"}>
                                <div className={"graphHead"}>Sectors with most demand</div>
                                <div  style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                <BarChart
                                    data={this.getSectorCompanies(companies.companies)}
                                    margin={{
                                        top: 5, right: 30, left: 5, bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="9 9" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="total" fill="#8884d8" />
                                    <Bar dataKey="hirings" fill="#00C49F" />
                                </BarChart>
                                </ResponsiveContainer>
                            </div>
                            </div>
                        </div>
                        <div className={"col-md-1"}>
                            {/*blank section*/}
                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}

Docs.propTypes = {
    getCompanies:PropTypes.func.isRequired,
    companies:PropTypes.object.isRequired
}

const mapStateToProps = state  => ({
    companies:state.companies
})

export default connect(mapStateToProps, {getCompanies})(withRouter(Docs))

