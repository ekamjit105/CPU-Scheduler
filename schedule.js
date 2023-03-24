/*
*
*
*		Declaration and initialisation
*
*
*/


//hardcoded array for testing
let arr = [
  [0, 9],
  [12, 12],
  [10, 12],
  [6, 4],
  [10, 6],
  [16, 4],
  [3, 6],
  [16, 2]
];		

//table to store avg TAT and WT for each algortihm
let avgtable = [
	[0,0],
	[0,0],
	[0,0],
	[0,0]
]

//colours assigned to each process
let colors=["background-color: rgba(255, 0, 0, 0.25);",
"background-color: rgba(0, 255, 0, 0.25);",
"background-color: rgba(0, 0, 255, 0.25);",
"background-color: rgba(0, 255, 255, 0.25);",
"background-color: rgba(255, 0, 255, 0.25);",
"background-color: rgba(255, 255, 0, 0.25);",
"background-color: rgba(239, 32, 163, 0.25);",
"background-color: rgba(24, 250, 217, 0.25);"]

//tat and wt for each process
let tat=[0,0,0,0,0,0,0,0], wt = [0,0,0,0,0,0,0,0] ;

//no of processes
let n=8;

function initialise()
{
	for(var i=0;i<n;i++)
	{
		tat[i]=0;
		wt[i]=0;
	}
	document.getElementById("steps").innerHTML="";
}


let TQ=4;		//default time quantum
let start=0;		//default starting time stamp







/*******************************************************/

/*									GANTT CHART     									 */

/*******************************************************/


/*  Node definition 
*
*		A node represents a process in the gantt list
*
*/


class gnode{
	constructor() {
		
		this.id=0;
		this.ct=0;
		this.next = null;
		this.completed=false;
	}

}

// linkedlist class
class ganttlist{
	
	
	constructor()
	{
		this.head=null;
		this.tail=null;
		this.count=0;
	}
	
//function to insert a node
	insert(temp)
	{
		if(this.head==null)
		{this.head=temp;
		this.tail=temp;}
		
		else
		{this.tail.next=temp;
		this.tail=temp;}
		this.count++;
		//console.log(temp.id+ " ct:"+temp.ct+" inserted")
		//console.log("inserted "+this.tail.id);
	}
	

//function to print gannt chart on GUI
	showgantt(){
		
		var str ="(0) ";
		if(this.head==null)
		{return;}
	
		var str="";
		document.getElementById("ganttchart").innerHTML="";
		

		var temp=this.head;
	
		while(temp)
		{	
			if(temp==this.head)
				str = "<td style='"+colors[temp.id-1]+"'><sub>"+start+"</sub>&nbsp&nbspP"+temp.id + " &nbsp<sub>" +temp.ct + "</sub> </td>" ;
			else{
				str = "<td style='"+colors[temp.id-1]+"'>&nbspP"+temp.id;
				if(temp.completed==true)
				{	str+="*";
					console.log("in for p"+temp.id);
		}
				str+=" &nbsp<sub>" +temp.ct + "</sub> </td>" ;
			}
			document.getElementById("ganttchart").innerHTML+=str;
			temp = temp.next;
		}

	}
	

	//function to print gant chart at each step in steps section
	ganttstep(){

		if(this.head==null)
		{
		return;}
	
		var str="<br><br>Process P"+this.tail.id+" selected<br><br><table border=1><tr>";
		

		var temp=this.head;
	
		while(temp)
		{
			if(temp==this.head)
				str = str+"<td style='"+colors[temp.id-1]+"'><sub>"+start+"</sub>&nbsp&nbspP"+temp.id + " &nbsp<sub>" +temp.ct + "</sub> </td>" ;
			else{
				str = str+"<td style='"+colors[temp.id-1]+"'>&nbspP"+temp.id;
				if(temp.completed==true)
					str+="*";
				str+=" &nbsp<sub>" +temp.ct + "</sub> </td>" ;
			}
			temp = temp.next;
		
		}

		str+="</tr></table><br><hr>";
			document.getElementById("steps").innerHTML+=str;
	}


}	//end of gantt class













/*******************************************************/

/*									QUEUE LIST      									 */

/*******************************************************/



/*  Node definition */

class node {

	constructor(id, at, bt) {
		
		this.pid=id;		
		this.at=at;		//arrival time of a process
		this.bt=bt;		//burst time of a process
		this.rr=0;		//response ratio
		this.lastts=at;		//last serviced time-stamp

		this.next = null;
		this.prev = null;
	
	}
}



// linkedlist class
class LinkedList {
	constructor() {
		this.head = null;
	}



/*******************************************************/

/*									LIST OPERATIONS 									 */

/*******************************************************/


insertbeg(){

/*
console.log("before sorting");
for (var i = 0; i < n; i++) {
		console.log(arr[i][0]+" "+arr[i][1]);	
		}				
	*/	
				

	for (var i = 0; i < n-1; i++)
    {
        var min_idx = i;
        for (var j = i+1; j < n; j++)
        if (arr[j][0] < arr[min_idx][0])
            min_idx = j;
 
        if(min_idx!=i)
            {	//swapping row of 2d array
            	var temp = arr[i][0];
            	arr[i][0] = arr[min_idx][0];
            	arr[min_idx][0] = temp;

            	temp = arr[i][1];
            	arr[i][1] = arr[min_idx][1];
            	arr[min_idx][1] = temp;
            }
    }

/*
console.log("after sorting");
for (var i = 0; i < n; i++) {
		console.log(arr[i][0]+" "+arr[i][1]);	
		}		
		*/		
console.log(" ");
console.log(" ");



		for (var i = 0; i <n; i++) {
				// creates a new node
				var temp = new node(i+1,arr[i][0],arr[i][1]);

				// to store current node
				var temp2;

				temp.next=this.head;
			
				if(this.head==null)
				this.tail=temp;
				else
				this.head.prev=temp;
				
				this.head=temp;

				this.n++;
			}	
			//this.display();	
	}




deleteend()
	{	
		//this.display();
		if(this.head==this.tail)
		{	this.head=null;
			this.tail=null;
			return;
		}
		
		var temp=this.tail.prev;
		temp.next=null;

		this.tail=temp;
		}
		
	deletebeg()
	{	
		if(this.head!=this.tail)
		this.head.next.prev=null;
		this.head=this.head.next;
		if(this.head==null)
		this.tail=null;
		
	}
	
	
	//function for Circular Left shifting (in RR)
	CSHL(ts)
	{
		//ts is the current timestamp
		//tail is the process to be shifted to back of the queue

		var temp=this.tail;
		var temp2=this.tail.prev;
		while(temp2 && temp2.at<=ts)
		{
			temp2=temp2.prev;
		}

		this.tail=this.tail.prev;

		if(temp2!=null)
		{
			temp2.next.prev=temp;
			temp.next=temp2.next;
			temp.prev=temp2;
			temp2.next=temp2;
		}

		else if(temp2==null)
		{
			temp.prev=null;
			temp.next=this.head;
			this.head.prev=temp;
			this.head=temp;
		}

	}


	//function to display process list in console(for testing)
	display(){
		var str = "";
		if(this.head==null)
		{return;}

		var temp=this.head;
		
		while(temp)
		{	
			str = temp.pid + " " +temp.at + " " +temp.bt + " ";
			console.log(str);
			temp = temp.next;
		}
	}


//function to update avg tat and wt for an algorithm
	updateavg(op)
	{
		var sumtat=0, sumwt=0;
		
		for(var i=0;i<n;i++)
		{
			sumtat+=tat[i];
			sumwt+=wt[i];
		}
		avgtable[op][0]=sumtat/n;
		avgtable[op][1]=sumwt/n;
		this.drawavgtable();

	}

//function to display avg table on gui
	drawavgtable()
	{
		var str="";
		document.getElementById("avgtable").innerHTML="<Tr><th>Algorithm</th><th>Avg TAT</th><th>Avg WT</th></tr>";
		str="<TR><td>Round Robin</td><td>"+avgtable[0][0]+"</td><td>"+avgtable[0][1]+"</td></TR>";
		str+="<TR><td>SRN</td><td>"+avgtable[1][0]+"</td><td>"+avgtable[1][1]+"</td></TR>";
		str+="<TR><td>HRN</td><td>"+avgtable[2][0]+"</td><td>"+avgtable[2][1]+"</td></TR>";
		str+="<TR><td>LCN</td><td>"+avgtable[3][0]+"</td><td>"+avgtable[3][1]+"</td></TR>";
		document.getElementById("avgtable").innerHTML+=str;
				
	}

//function to display result of selected algorithm
	result(){
		var sumtat=0, sumwt=0;
		var str="";
		document.getElementById("tab").innerHTML="";
			
		str="<TR><td>PID</td><td>AT</td><td>BT</td><td>TAT</td><td>WT</td></TR>";
		document.getElementById("tab").innerHTML+=str;
		
		for(var i=0;i<n;i++)
		{
			str="<TR><td>P"+(i+1)+"</td><td>"+arr[i][0]+"</td><td>"+arr[i][1]+"</td><td>"+tat[i]+"</td><td>"+wt[i]+"</td></TR>";
			sumtat+=tat[i];
			sumwt+=wt[i];
			document.getElementById("tab").innerHTML+=str;
		}

		document.getElementById("result").innerHTML="Avg TAT : "+sumtat/n+"<br><br>Avg WT : "+sumwt/n;
		
	}


//function to display result of selected algorithm at each step
	steptab(ts)
	{
		var str="";
		document.getElementById("steps").innerHTML+="<br><br>Process Table<br><br>";
		str+="<table border=1 class='restable'>";
		str+="<TR><td>PID</td><td>AT</td><td>Remaining BT</td></TR>";
		
		var temp=this.tail;
		while(temp && temp.at<=ts)
		{
			str=str+"<TR><td>P"+temp.pid+"</td><td>"+temp.at+"</td><td>"+temp.bt+"</td></tr>";
			temp=temp.prev;
		}
		str+="</table>";
		document.getElementById("steps").innerHTML+=str;

	}



/*******************************************************/

/*									ALGORITHMS      									 */

/*******************************************************/

	roundrobin()
	{
		//TQ=4;
		TQ=  parseInt(document.getElementById("TQinput").value);
		//this.display();
		document.getElementById("pname").innerHTML="Round Robin Algorithm";
		var TS=this.tail.at;		//current timestamp (starting from least arrival time)
		start=TS;
		var count=0;
		var obj = new ganttlist();
		var noprocesses=n; //no of processes currently in system
		
		initialise();

		while(count!=n)
		{
			this.steptab(TS);
			var temp = this.tail;
		
			wt[(temp.pid)-1]+=TS-temp.lastts; 
			
			var n1 = new gnode();
			
			if(temp.bt<=TQ)
			{
				n1.id=temp.pid;
				TS+=temp.bt;
				n1.ct=TS;
				n1.completed=true;
				console.log("p"+temp.pid+" marked as completed"+n1.completed);
				tat[(temp.pid)-1]=TS - temp.at; //finally calculating turnaround time
				
				this.deleteend();//delete node from end of rrqueue
				
				obj.insert(n1);//adding node to gantt list
				
				count++; //process completed
				noprocesses--;
				
			}
			
			else{
				
				n1.id=temp.pid;
				TS+=TQ;
				n1.ct=TS;
				obj.insert(n1);//adding node to gantt list

				temp.bt-=TQ;
				temp.lastts=TS;
					
				if(noprocesses >1)
				{
					if(temp.prev.at <= TS)
					{	//there is another process in queue
						this.CSHL(TS); //circular shift left
						
					}
				}
				
			}
			
			obj.ganttstep();		//create a step	
		}

		obj.showgantt();			//display final gantt chart
		
		this.updateavg(0);		//update avg table
		this.result();				//display algorithm result
	}






	



	SRN(){
	
		document.getElementById("pname").innerHTML="Shortest Request Next Algorithm";
		
		initialise();

		var TS=this.tail.at;		//current timestamp (starting from 0)
		start=TS;
		var count=0;
		var obj = new ganttlist();
		
		while(count!=n)
		{
			this.steptab(TS);

			var temp = this.tail;
			//it is not the only process left
			
			var temp2=this.tail.prev;
			
			while(temp2!=null && temp2.at<=TS)
			{	
				if(temp2.bt<temp.bt)
				{
					
					temp=temp2;
				}


				temp2=temp2.prev;
				
			}
				
				wt[temp.pid-1]=TS-temp.at;
			
				TS+=temp.bt;
				var n1 = new gnode();
				n1.id=temp.pid;
				n1.ct=TS;
				obj.insert(n1);
				
				tat[temp.pid-1]=TS-temp.at;
				
				
				if(temp==this.tail)
				{this.deleteend();}
				
				else if(temp==this.head)
				{this.deletebeg();}
				
				else
				{
					temp.prev.next=temp.next;
					temp.next.prev=temp.prev;
					
				}
				count++;
				
			obj.ganttstep();		//create a step	
		}

		obj.showgantt();			//display final gantt chart
		
		this.updateavg(1);		//update avg table
		this.result();				//display algorithm result
	
	}







	HRN(){
	
		initialise();
		document.getElementById("pname").innerHTML="Highest Response Ratio Next Algorithm";
		var TS=this.tail.at;		//current timestamp (starting from 0)
		start=TS;
		var count=0;
		
		var obj = new ganttlist();
		
		while(count!=n)
		{
			this.steptab(TS);
			var temp = this.tail;
			
			temp.rr = (TS - temp.at + temp.bt)/temp.bt;
			
			var temp2=this.tail.prev;
			
			while(temp2!=null && temp2.at<=TS)
			{	
				temp2.rr = (TS - temp2.at + temp2.bt)/temp2.bt;
				
				if(temp2.rr>temp.rr)
				{
					temp=temp2;
				}
				temp2=temp2.prev;
				
			}
				
				wt[temp.pid-1]=TS-temp.at;
			
				TS+=temp.bt;

				var n1 = new gnode();
				n1.id=temp.pid;
				n1.ct=TS;
				obj.insert(n1);
				
				tat[temp.pid-1]=TS-temp.at;
				
				
				if(temp==this.tail)
				{this.deleteend();}
				
				else if(temp==this.head)
				{this.deletebeg();}
				
				else
				{
					temp.prev.next=temp.next;
					temp.next.prev=temp.prev;
					//delete temp;
				}
				count++;
		
			obj.ganttstep();		//create a step	
		}

		obj.showgantt();			//display final gantt chart
		
		this.updateavg(2);		//update avg table
		this.result();				//display algorithm result
	
	}

LCN()
	{

		document.getElementById("pname").innerHTML="Least completed next Algorithm";
	
		

		initialise();

		var TS=this.tail.at;		//current timestamp (starting from 0)
		TQ=1;
		start=TS;
		var count=0;
		var obj = new ganttlist();
		//int noprocesses=n; //no of processes currently in system
		
		while(count!=n)
		{
			this.steptab(TS);
			var temp = this.tail;
			
			var temp2=this.tail.prev;

			while(temp2!=null && temp2.at<=TS)
			{	
				
				if(temp2.bt>temp.bt)	//comparing remaining burst times
				{
					temp=temp2;
				}
				temp2=temp2.prev;
				
			}
				
				wt[temp.pid-1]+=TS - temp.lastts;
			
				var n1 = new gnode();
				
				
				if(temp.bt<=TQ)	//completion phase
				{
					TS+=temp.bt;
					//temp.serviced+=temp.bt;
					n1.id=temp.pid;
					n1.ct=TS;
					obj.insert(n1);
					
					n1.completed=true;
					tat[temp.pid-1]=TS-temp.at;
				
				
					if(temp==this.tail)
					{this.deleteend();}
					
					else if(temp==this.head)
					{this.deletebeg();}
					
					else
					{
						temp.prev.next=temp.next;
						temp.next.prev=temp.prev;
						//delete temp;
					}
					count++;
				}
				
				else
				{
					TS+=TQ;
					//temp.serviced+=TQ;
					temp.bt-=TQ;
					temp.lastts=TS;
					n1.id=temp.pid;
					n1.ct=TS;
					obj.insert(n1);
				}
			

			obj.ganttstep();		//create a step	
		}

		obj.showgantt();			//display final gantt chart
		
		this.updateavg(3);		//update avg table
		this.result();				//display algorithm result
	
	}

}