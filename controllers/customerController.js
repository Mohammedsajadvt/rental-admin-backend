const Customer = require('../models/Customer');

exports.createCustomer = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    const customerData = {
      ...req.body,
      createdBy: req.user._id,
    };

    const customer = new Customer(customerData);
    await customer.save();

    const populated = await Customer.findById(customer._id)
      .populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      data: populated,
    });
  } catch (err) {
    console.error('Create customer error:', err);
    res.status(400).json({
      success: false,
      message: 'Failed to create customer',
      error: err.message,
    });
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const {
      search = '',
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      order = 'desc',


    } = req.query;

    let query = {};

    if (search.trim()) {
      query.$or = [
        { name: { $regex: search.trim(), $options: 'i' } },
        { email: { $regex: search.trim(), $options: 'i' } },
      ];
    }



    const skip = (Number(page) - 1) * Number(limit);
    const sort = { [sortBy]: order === 'asc' ? 1 : -1 };

    const customers = await Customer.find(query)
      .populate('createdBy', 'name email')
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await Customer.countDocuments(query);

    res.json({
      success: true,
      count: customers.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: customers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch customers',
      error: err.message,
    });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found',
      });
    }

    res.json({
      success: true,
      data: customer,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message,
    });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found',
      });
    }

    const { createdBy, ...updateData } = req.body;

    Object.assign(customer, updateData);

    await customer.save();

    const updated = await Customer.findById(req.params.id)
      .populate('createdBy', 'name email');

    res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Failed to update customer',
      error: err.message,
    });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found',
      });
    }

    await customer.deleteOne();

    res.json({
      success: true,
      message: 'Customer deleted successfully',
      deletedId: req.params.id,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete customer',
      error: err.message,
    });
  }
};