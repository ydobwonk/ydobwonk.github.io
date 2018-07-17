class Project
{
	constructor(name, timeline, handsOnTable)
	{
		this.name = name;
		this.timeline = timeline;
		this.track = null;
		this.scale = null;
        this.axes = null;
		this.trackList = {};
		this.scaleList = [];
        this.axesList = [];
        this.handsOnTable = handsOnTable;
        this.handsOnTable.updateSettings({
            readOnly: true,
            autoColumnSize: true,
            manualColumnResize: true,
            manualColumnMove: true,
            rowHeaders: false,
            colHeaders: true,
            startRows: 3,
            fixedColsLeft: 1,
            preventOverflow: "horizontal",
            type: "numeric",
            stretchH: "last"
        });

        this.state = {
			_mode: "default",
			modeCallbacks: [],
			selectionCallbacks: [],
			set mode(val){
				this._mode = val;
				for(var i = 0; i < this.modeCallbacks.length; i++)
				{
					this.modeCallbacks[i](this._mode);
				}
			},
			get mode(){
				return this._mode;
			},
			modeChange: function(val){
				this.modeCallbacks.push(val);
            },
            default: function(){
                this._mode = "default";
				for(var i = 0; i < this.modeCallbacks.length; i++)
				{
					this.modeCallbacks[i](this._mode);
				}
            }
        };


        this.timeline.project = this;
    }
	newTrack(name, color, stage, unit="m", makeDefault=true)
	{
		let track = new Track(this, this.timeline, name, color, stage, unit);
		this.trackList[track.uid] = track;
        if(makeDefault)
        {
            this.track = track;
            this.track.select();
        }
        track.table.makeActive();
        return track;
	}
	newAxes(stage, x, y, color, makeDefault=true)
	{
		let axes = new Axes(stage, x, y, color);
		this.axesList.push(axes);
		if(makeDefault)
			this.axes = axes;
	}
	newScale(stage, name, size, x1, y1, x2, y2, color="#39ff14", makeDefault=true)
	{
		let scale = new Scale(stage, name, size, x1, y1, x2, y2, color);
		this.scaleList.push(scale);
		if(makeDefault)
            this.scale = scale;
            
        return scale;
    }
    switchTrack(uid)
    {
        if(this.trackList[uid] !== undefined)
        {
            this.track = this.trackList[uid];
            this.track.select();
        }
    }
}