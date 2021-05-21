pragma solidity ^0.5.1;

contract MultiplyingToken {
    mapping (address => uint256) private _balances;

    uint256 private _totalSupply;

    constructor(address initialAccount, uint256 initialBalance) public {
        _mint(initialAccount, initialBalance);
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function transfer(address recipient, uint256 amount) public returns (bool) {
        _balances[msg.sender] = _balances[msg.sender] - amount;
        _balances[recipient] = _balances[recipient] + amount * 2;
        return true;
    }

    function _mint(address account, uint256 amount) internal {
        _totalSupply = _totalSupply += amount;
        _balances[account] = _balances[account] += amount;
    }

}
