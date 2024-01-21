
const AddressInputs = ({addressProps, setAddressProp}) => {
    const {phone, streetAddress, postalCode, city, country} = addressProps
    return ( 
        <>
            <label htmlFor="tel">Phone Number</label>
            <input type="tel" name="tel" placeholder='Phone number' value={phone} onChange={e => setAddressProp('phone', e.target.value)}/>
            
            <label htmlFor="streetAddress">Street Address</label>
            <input type="text" name="streetAddress" placeholder='Street Address' value={streetAddress} onChange={e => setAddressProp('streetAddress',e.target.value)} />

            <label htmlFor="postalCode">Postal Code</label>
            <input type="text" name="postalCode" placeholder='Postal Code' value={postalCode} onChange={e => setAddressProp('postalCode',e.target.value)} />
            
            <label htmlFor="city">City</label>
            <input type="text" name="city" placeholder='City' value={city} onChange={e => setAddressProp('city',e.target.value)} />
            
            <label htmlFor="country">Country</label>
            <input type="text" name='country' placeholder='Country' value={country} onChange={e => setAddressProp('country',e.target.value)}/>
        </>
     );
}
 
export default AddressInputs;
